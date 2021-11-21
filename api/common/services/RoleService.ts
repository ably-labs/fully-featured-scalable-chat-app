import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { Role } from "../metadata/Role";

export class RoleService {
  private _repo: CosmosDbMetadataRepository;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
  }

  public async getRoleByName(name: string): Promise<{ exists: boolean; role?: Role }> {
    const existing = await this._repo.getByProperty<Role>("Role", "name", name);

    if (existing.length > 0) {
      const asRoleType = Object.assign(new Role(), existing[0]);
      return { exists: true, role: asRoleType };
    } 
    return { exists: false, role: null };
  }
}
