export type Entity = { id: string; type: string };

export interface IMetadataRepository {
  getById<TEntityType extends Entity>(typeName: string, id: string): Promise<TEntityType>;
  getByProperty<TEntityType extends Entity>(typeName: string, propertyName: string, value: any): Promise<TEntityType[]>;
  saveOrUpdate<TEntityType extends Entity>(entity: TEntityType): Promise<void>;
  delete<TEntityType extends Entity>(entity: TEntityType): Promise<boolean>;
  exists(typeName: string, id: string): Promise<boolean>;
  getAll<TEntityType extends Entity>(typeName: string): Promise<TEntityType[]>;
}
