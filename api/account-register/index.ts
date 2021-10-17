import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosDbMetadataRepository } from "../common/CosmosDbMetadataRepository";
import { User } from "../common/metadata/User";
import * as Validator from 'validatorjs';

export type RegistrationForm = { username: string; firstName: string; lastName: string; password: string; }

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const data = { ... req.body } as RegistrationForm;

    const validation = new Validator(data, {
        name: 'required',
        firstName: 'required',
        lastName: 'required',
        password: 'required|min:8'
    });
    
    if (validation.fails()) {
        context.res = { status: 400, body: JSON.stringify(validation.errors.all())};
        return;
    }

    //const repository = new CosmosDbMetadataRepository();
    //const user = User.fromRegistrationForm(data);    
    //const result = await repository.createUser(data);

    context.res = { status: 200, body: "reged" };
};

export default httpTrigger;