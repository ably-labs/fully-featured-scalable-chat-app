import { CosmosClient } from "@azure/cosmos";

export class CosmosDbMetadataRepository<TEntityType> {

    private _client: CosmosClient;
    private _databaseId: string;

    constructor() {
        const endpoint = process.env['COSMOS_ENDPOINT'];
        const key = process.env['COSMOS_KEY'];
        this._databaseId = process.env['COSMOS_DATABASE_ID'];
        this._client = new CosmosClient({ endpoint, key });
    }

    public async getById(entityType: string, id: string): Promise<TEntityType> {        
        const containerId = "users";
        const database = await this._client.database(this._databaseId);
        const container = await database.container(containerId);

        return null;
    }

    public async getByProperty(entityType: string, propertyName: string, value: any): Promise<TEntityType> {
        return null;
    }

    public async saveOrUpdate(entityType: string, entity: TEntityType): Promise<TEntityType> {
        return null;
    }

    public async exists(entityType: string, id: string): Promise<boolean> {
        return false;
    }

    public async getAll(): Promise<TEntityType[]> {
        return [];
    }
}