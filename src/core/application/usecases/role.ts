import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";

//⬇️⛔🆘 No sera necesario usar CreateRole, o otros usecases parecidos ya que eso seran services, al utilizar User y Role
//🙋‍♂️⚠️➡️ Aquí solo pondremos usecases como ListRole, ListRolesByPermission, etc...: Solo utilizan el Role

// export class CreateRole {
//   constructor(private roleRepository: RoleRepository) {}

//   async execute(rol: Role): Promise<Role> {
//     const createdRole = await this.roleRepository.create(rol)
//     return createdRole;
//   }
// }
export class DeleteRole {
    constructor(private roleRepository: RoleRepository) {}
  
    async execute(id: string): Promise<void> {
      await this.roleRepository.delete(id)
      
    }
  }
export class ListRole {
constructor(private roleRepository: RoleRepository) {}

async execute(id: string): Promise<Role|null> {
    const findedRole = await this.roleRepository.findById(id)
    return findedRole;
}
}
export class UpdateRole{
  constructor(private roleRepository:RoleRepository){}
  async execute(id:string, permissions: RoleType){
    return await this.roleRepository.update(id, permissions)
  }
}