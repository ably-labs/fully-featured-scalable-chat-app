import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { JwtGenerator } from "../common/JwtGenerator";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const knownGood = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZmZzY2hhdC5hYmx5LmRldi8iLCJzdWIiOiJ1c2Vycy9iNmYwZDFhOC04OWVmLTRmYjQtYjc1MS1hZWU5NjcyZjRmYzMiLCJzY29wZSI6InNlbGYsIHVzZXJzIiwidXNlcklkIjoiYjZmMGQxYTgtODllZi00ZmI0LWI3NTEtYWVlOTY3MmY0ZmMzIiwianRpIjoiMDIyOTFlZDctOTE1MS00ZmNhLTg2MzMtNWQ4NGQ1NTQ2Nzg4IiwiaWF0IjoxNjM0NTg2ODgwLCJleHAiOjE2MzQ1OTA0ODB9.e3lQKT70iN3LRP-WwCYctUl6vFoxU-3BqfesmejJSsw";

    const appSetting = process.env.JWT_SIGNING_KEY;
    const jwtValidator = JwtGenerator.fromEnvironment();

    const packedJwt = req.headers.authorization || "";
    const jwtText = packedJwt.replace("Bearer ", "");
    const { success, token } = jwtValidator.validate(jwtText);


    const knownResult = jwtValidator.validate(knownGood);

    const outputs = {
        appSetting,
        packedJwt,
        success,
        token,
        knownGoodToken: knownResult.token,
        knownGoodSuccess: knownResult.success
    }


    context.res = { status: 200, body: JSON.stringify(outputs) };
};

export default httpTrigger;