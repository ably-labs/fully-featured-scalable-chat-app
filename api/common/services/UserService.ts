import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { JwtGenerator } from "../JwtGenerator";
import { User } from "../metadata/User";
import { getAzureProfileImgBlobByUrl } from "../dataaccess/AzureBlobStorageClient";
import { Role } from "../metadata/Role";
import { RoleService } from "./RoleService";
import * as md5 from "md5";

export type LoginMetadata = {
  username: string;
  firstName: string;
  lastName: string;
};
export type UserCreationRequest = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  oauthSub?: string;
  oauthPicture?: string;
};

export class UserService {
  private _repo: CosmosDbMetadataRepository;
  private _jwtValidator: JwtGenerator;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
    this._jwtValidator = JwtGenerator.fromEnvironment();
  }

  public async getUserByUsername(username: string): Promise<{ exists: boolean; user?: User }> {
    const existing = await this._repo.getByProperty<User>("User", "username", username);

    if (existing.length > 0) {
      const asUserType = Object.assign(new User(), existing[0]);
      return { exists: true, user: asUserType };
    }

    return { exists: false, user: undefined };
  }

  public async getUserByOAuthSubscription(sub: string): Promise<{ exists: boolean; user?: User }> {
    const existing = await this._repo.getByProperty<User>("User", "oauthSub", sub);

    if (existing.length > 0) {
      const asUserType = Object.assign(new User(), existing[0]);
      return { exists: true, user: asUserType };
    }

    return { exists: false, user: undefined };
  }

  public async getRoleByUsername(username: string): Promise<{ exists: boolean; role?: Role }> {
    const { exists, user } = await this.getUserByUsername(username);
    if (!exists) {
      return { exists: false, role: undefined };
    }

    const roleService = new RoleService();
    const result = await roleService.getRoleByName(user.roleName);

    const { exists: roleExists, role } = result;

    if (!roleExists) {
      return { exists: false, role: undefined };
    }

    return { exists: true, role: role };
  }

  public async getUserById(id: string): Promise<{ exists: boolean; user?: User }> {
    const existing = await this._repo.getByProperty<User>("User", "id", id);

    if (existing.length > 0) {
      const asUserType = Object.assign(new User(), existing[0]);
      return { exists: true, user: asUserType };
    }
    return { exists: false, user: undefined };
  }

  public async createUser(request: UserCreationRequest): Promise<User> {
    const userProfileImageSmallUrl = await this.getProfileImage(request.email, 80, request.oauthPicture);
    const userProfileImageLargeUrl = await this.getProfileImage(request.email, 600, request.oauthPicture);
    const requestWithProfileImg = {
      ...request,
      profileImgUrl: userProfileImageUrl,
      roleName: "normal"
    };
    const user = User.fromJSON(requestWithProfileImg);
    await this._repo.saveOrUpdate<User>(user);
    return user;
  }

  public generateLoginMetadataFor(user: User): {
    token: string;
    userDetails: LoginMetadata;
  } {
    const token = this._jwtValidator.generate(user.id, user.roleName);
    const userDetails = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImgSmallUrl: user.profileImgSmallUrl,
      profileImgLargeUrl: user.profileImgLargeUrl
    };
    return { token, userDetails };
  }

  public async getProfileImage(email: string, size: number, oauthPicture?: string) {
    let userProfileImageUrl: string;
    const defaultUserProfileImageUrl = await getAzureProfileImgBlobByUrl();
    if (oauthPicture) {
      const googleSizeDelimiter = oauthPicture.indexOf("=s");
      userProfileImageUrl =
        googleSizeDelimiter !== -1 ? `${oauthPicture.substring(0, googleSizeDelimiter)}=s${size}` : oauthPicture;
    } else {
      userProfileImageUrl = `https://www.gravatar.com/avatar/${this.getEmailHash(email)}?d=${encodeURIComponent(
        defaultUserProfileImageUrl
      )}&s=${size}`;
    }
    return userProfileImageUrl;
  }

  private getEmailHash(email: string): string {
    return md5(email.toLowerCase().trim());
  }
}
