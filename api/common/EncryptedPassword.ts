import { bcrypt } from 'bcrypt';

export class EncryptedPassword {

    public value: string;
    
    constructor(encryptedPassword: string) {
        this.value = encryptedPassword;
    }

    public static fromPlainText(plainTextPassword: string): EncryptedPassword {    
        const encryptedValue = bcrypt.hashSync(plainTextPassword, 10);
        return new EncryptedPassword(encryptedValue);
    }
}