import { readRoleUC } from "@/core/application/usecases/entities/role";



// ver si necesito fetchAdmins, yo creo que no es necesario!

export const fetchAdmins = async () => {
  try {
    const roles = await readRoleUC()
    const admins = roles?.filter(role => role.permissions === "ADMIN")
    return admins
  } catch (error) {
    console.error("Error al obtener los admins: ", error);
    throw new Error('No se pudieron obtener los administradores');
  }
}