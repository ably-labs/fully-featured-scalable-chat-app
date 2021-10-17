import * as bcrypt from "bcrypt";

export interface IUser {    
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
}

export class User implements IUser {
    
    public id: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public passwordHash: string;

    constructor() {        
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
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}