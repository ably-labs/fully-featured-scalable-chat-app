export class CosmosDbMetadataRepository<TEntityType> {

    constructor() {        
        // connect to cosmos db
        /*const cosmosClient = require('@azure/cosmos').CosmosClient;
        const endpoint = process.env['COSMOS_ENDPOINT'];
        const key = process.env['COSMOS_KEY'];
        const databaseId = process.env['COSMOS_DATABASE_ID'];
        const containerId = process.env['COSMOS_CONTAINER_ID'];
        const client = new cosmosClient({ endpoint, key });
        const database = await client.database(databaseId);
        const container = await database.container(containerId);*/
    }

    public async exists(id: string): Promise<boolean> {
        return false;
    }

    public async getAll(): Promise<TEntityType[]> {
        return [];
    }

    public async getById(id: string): Promise<TEntityType> {
        return null;
    }

    public async createOrInsert(entity: TEntityType): Promise<TEntityType> {
        return null;
    }

}