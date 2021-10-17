import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    // connect to cosmos db
    /*const cosmosClient = require('@azure/cosmos').CosmosClient;
    const endpoint = process.env['COSMOS_ENDPOINT'];
    const key = process.env['COSMOS_KEY'];
    const databaseId = process.env['COSMOS_DATABASE_ID'];
    const containerId = process.env['COSMOS_CONTAINER_ID'];
    const client = new cosmosClient({ endpoint, key });
    const database = await client.database(databaseId);
    const container = await database.container(containerId);*/

    // validate the request
        



    context.res = {
        status: 200,
        body: "hi"
    };
};

export default httpTrigger;