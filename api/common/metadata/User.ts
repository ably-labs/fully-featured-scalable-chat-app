export interface IUser {    
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
}

export class User {
    
    public id: string;
    public username: string;
    public firstName: string;
    public lastName: string;

    public passwordHash: string;

    constructor() {        
    }

    public static fromJSON(json: IUser): User {
        return Object.assign(new User(), json);
    }
}