import { CosmosClient, Container } from "@azure/cosmos";
import { Entity } from "./IMetadataRepository";

export class CosmosDbMetadataRepository {

    private _client: CosmosClient;
    private _databaseId: string;

    constructor() {
        const endpoint = process.env['COSMOS_ENDPOINT'];
        const key = process.env['COSMOS_KEY'];
        this._databaseId = process.env['COSMOS_DATABASE_ID'];
        this._client = new CosmosClient({ endpoint, key });
    }

    public async getById<TEntityType extends Entity>(typeName: string, id: string): Promise<TEntityType> {        
        const container = await this.getContainer(typeName);
        const allMatchingItems = await container.items.query(`SELECT * FROM c WHERE c.id = '${id}'`).fetchAll();
        return allMatchingItems[0];
    }

    public async getByProperty<TEntityType extends Entity>(typeName: string, propertyName: string, value: any): Promise<TEntityType[]> {
        const container = await this.getContainer(typeName);
        const results = await container.items.query(`SELECT * FROM c WHERE c.${propertyName} = '${value}'`).fetchAll();
        return results.resources as TEntityType[];        
    }

    public async saveOrUpdate<TEntityType extends Entity>(entity: TEntityType): Promise<void> {
        const container = await this.getContainer(entity.type);
        const result = await container.items.upsert(entity);

        if (result.statusCode !== 201) {
            throw new Error(`Error saving or updating entity ${entity.id}`);
        }
    }

    public async exists<TEntityType extends Entity>(typeName: string, id: string): Promise<boolean> {
        const containerId = this.generateContainerName(typeName);
        return false;
    }

    public async getAll<TEntityType extends Entity>(typeName: string): Promise<TEntityType[]> {
        const containerId = this.generateContainerName(typeName);
        return [];
    }

    private async getContainer(typeName: string): Promise<Container> {
        const containerId = this.generateContainerName(typeName);
        const database = await this._client.database(this._databaseId);
        return await database.container(containerId);
    }

    private generateContainerName(typeName: string): string {
        return typeName.toLowerCase() + "s"; // yolo!
    }
}