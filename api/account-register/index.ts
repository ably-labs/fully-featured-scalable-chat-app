import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosDbMetadataRepository } from "../common/dataaccess/CosmosDbMetadataRepository";
import { User } from "../common/metadata/User";
import * as Validator from 'validatorjs';
import { generateJwt } from "../common/JwtGenerator";

export type RegistrationForm = { username: string; firstName: string; lastName: string; password: string; }
const registrationFormRules = { username: 'required', firstName: 'required', lastName: 'required', password: 'required|min:1'};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const data = { ... req.body } as RegistrationForm;
    const validation = new Validator(data, registrationFormRules);
    
    if (validation.fails()) {
        context.res = { status: 400, body: JSON.stringify(validation.errors.all())};
        return;
    }
    
    const repository = new CosmosDbMetadataRepository();
    const existing = await repository.getByProperty<User>("User", "username", data.username);

    if (existing?.length != 0) { 
        context.res = { status: 400, body: JSON.stringify({"username":["This username is not available."]})};
        return;
    }

    const user = User.fromRegistrationForm(data);
    const result = await repository.saveOrUpdate<User>(user);

    const token = generateJwt(user.id);
    const userDetails = { username: user.username, firstName: user.firstName, lastName: user.lastName };

    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "created", token, userDetails })};
};

export default httpTrigger;