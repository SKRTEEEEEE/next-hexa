// import { Role, RoleType } from "@/core/domain/entities/Role";
// import { RoleRepository } from "@/core/domain/repositories/role-repository";

import { RoleType } from "@/core/domain/entities/Role";
import { roleRepository } from "@/core/infrastructure/repositories/mongoose-role";

//⬇️⛔🆘 No sera necesario usar CreateRole, o otros usecases parecidos ya que eso seran services, al utilizar User y Role
//🙋‍♂️⚠️➡️ Aquí solo pondremos usecases como ListRole, ListRolesByPermission, etc...: Solo utilizan el Role

export const createRoleUC = async(address:string, role: RoleType) => {
    const newRole = { address, permissions: role }
    return await roleRepository.create(newRole)
  }
// export class DeleteRole {
//     constructor(private roleRepository: RoleRepository) {}
  
//     async execute(id: string): Promise<void> {
//       await this.roleRepository.delete(id)
      
//     }
//   }

// 🧠⚠️➡️ Podemos crear los "use-cases" agrupados, como hemos hecho en services. Esto nos ahorrara tener que inicializar siempre en mismo constructor.
// Se comentan ya que de momento no se utilizan
// export class ListRole {
// constructor(private roleRepository: RoleRepository) {}
// async execute(id: string): Promise<Role|null> {
//     const findedRole = await this.roleRepository.findById(id)
//     return findedRole;
// }
// }
// export class UpdateRole{
//   constructor(private roleRepository:RoleRepository){}
//   async execute(id:string, permissions: RoleType){
//     return await this.roleRepository.update(id, permissions)
//   }
// }

