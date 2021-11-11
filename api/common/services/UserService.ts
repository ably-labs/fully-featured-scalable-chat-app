import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { JwtGenerator } from "../JwtGenerator";
import { User } from "../metadata/User";

export type LoginMetadata = {
  username: string;
  firstName: string;
  lastName: string;
};
export type UserCreationRequest = {
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  oauthSub?: string;
};

export class UserService {
  private _repo: CosmosDbMetadataRepository;
  private _jwtValidator: JwtGenerator;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
    this._jwtValidator = JwtGenerator.fromEnvironment();
  }

  public async getUserByUsername(
    username: string
  ): Promise<{ exists: boolean; user?: User }> {
    const existing = await this._repo.getByProperty<User>(
      "User",
      "username",
      username
    );

    if (existing.length > 0) {
      const asUserType = Object.assign(new User(), existing[0]);
      return { exists: true, user: asUserType };
    }

    return { exists: false, user: undefined };
  }

  public async getUserByOAuthSubscription(
    sub: string
  ): Promise<{ exists: boolean; user?: User }> {
    const existing = await this._repo.getByProperty<User>(
      "User",
      "oauthSub",
      sub
    );

    if (existing.length > 0) {
      const asUserType = Object.assign(new User(), existing[0]);
      return { exists: true, user: asUserType };
    }

    return { exists: false, user: undefined };
  }

  public async createUser(request: UserCreationRequest): Promise<User> {
    const user = User.fromJSON(request);
    await this._repo.saveOrUpdate<User>(user);
    return user;
  }

  public generateLoginMetadataFor(user: User): {
    token: string;
    userDetails: LoginMetadata;
  } {
    const token = this._jwtValidator.generate(user.id);
    const userDetails = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return { token, userDetails };
  }
}
