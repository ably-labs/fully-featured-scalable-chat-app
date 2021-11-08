import * as bcrypt from "bcrypt";
import { OAuthResult } from "./OAuthLoginResult";
import { Entity } from "../dataaccess/IMetadataRepository";

export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
}

export class User implements IUser, Entity {

    public id: string;

    public username: string;
    public firstName: string;
    public lastName: string;
    public passwordHash: string;
    public oauthSub: string;

    public readonly type: string;

    constructor() {
        this.type = "User";
    }

    public static fromOAuthResult(username: string, registration: OAuthResult): User {
        return User.fromJSON({
            id: User.createId(),
            username: username,
            firstName: registration.given_name,
            lastName: registration.family_name,
            passwordHash: "",
            oauthSub: registration.sub
        });
    }

    public static fromRegistrationForm(registration: any): User {
        return User.fromJSON({
            id: User.createId(),
            username: registration.username,
            firstName: registration.firstName,
            lastName: registration.lastName,
            passwordHash: bcrypt.hashSync(registration.password, 10)
        });
    }

    public static fromJSON(json: any): User {
        return Object.assign(new User(), json);
    }

    private static createId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
