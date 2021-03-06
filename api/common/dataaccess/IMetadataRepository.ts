export type Entity = { id: string; type: string };

export interface IMetadataRepository {
  getById<TEntityType extends Entity>(typeName: string, id: string): Promise<TEntityType>;
  getByProperty<TEntityType extends Entity>(typeName: string, propertyName: string, value: any): Promise<TEntityType[]>;
}
