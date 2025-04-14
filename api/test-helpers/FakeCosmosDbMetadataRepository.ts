import { Entity } from "../common/dataaccess/IMetadataRepository";

export const saveOrUpdateCalls = [];
export const inMemoryDb = new Map<string, any[]>();

export function addItemToDb(typeName: string, item: any) {
  const items = inMemoryDb.get(typeName) || [];
  items.push(item);
  inMemoryDb.set(typeName, items);
}

export function clearDbItems() {
  inMemoryDb.clear();
}

class FakeCosmosDbMetadataRepository {
  getById<TEntityType extends Entity>(typeName: string, id: string): Promise<TEntityType> {
    const items = inMemoryDb.get(typeName) || [];
    const itemsToReturn = items?.filter((item) => item.id === id);
    return Promise.resolve(itemsToReturn[0] as TEntityType);
  }
  getByProperty<TEntityType extends Entity>(typeName: string, propertyName: string, value: any): Promise<TEntityType[]> {
    const items = inMemoryDb.get(typeName) || [];
    const itemsToReturn = items?.filter((item) => item[propertyName] === value);
    return itemsToReturn as any;
  }

  saveOrUpdate<TEntityType extends Entity>(entity: TEntityType): Promise<TEntityType> {
    saveOrUpdateCalls.push(entity);
    return Promise.resolve(entity);
  }

  delete<TEntityType extends Entity>(entity: TEntityType): Promise<void> {
    const index = saveOrUpdateCalls.indexOf(entity);
    if (index > -1) {
      saveOrUpdateCalls.splice(index, 1);
    }

    return Promise.resolve();
  }

  getAll<TEntityType extends Entity>(typeName: string): Promise<TEntityType[]> {
    const items = inMemoryDb.get(typeName) || [];
    return items as any;
  }
}

const mock = { CosmosDbMetadataRepository: FakeCosmosDbMetadataRepository };
jest.doMock("../common/dataaccess/CosmosDbMetadataRepository", () => mock);
