import { Entity } from "../common/dataaccess/IMetadataRepository";

const fakeCalls = {};
export const saveOrUpdateCalls = [];

export function mockCall(name: string, callback: (...args: any[]) => any) {
    fakeCalls[name] = callback;
}

class FakeCosmosDbMetadataRepository {
    constructor() {
    }

    getByProperty<TEntityType extends Entity>(typeName: string, propertyName: string, value: any): Promise<TEntityType[]> {
        return fakeCalls['getByProperty']?.apply(this, arguments);
    }

    saveOrUpdate<TEntityType extends Entity>(entity: TEntityType): Promise<void> {
        saveOrUpdateCalls.push(entity);
        return fakeCalls['saveOrUpdate']?.apply(this, arguments);
    }
}

export const Mock = { CosmosDbMetadataRepository: FakeCosmosDbMetadataRepository };