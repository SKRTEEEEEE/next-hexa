import {  User, UserBase } from "@/core/domain/entities/User";
import { MongooseUserRepository } from "@/core/infrastructure/mongoose/entities/user.repository";

import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

// 🧠👨‍🎓💡 Vamos a hacer la inyección aquí, SIN hacer EXPORT -> Así: nos aseguramos de solo utilizar la infra aquí(application)
// 🧠🚧⚠️ En el futuro -> trataremos de solo usar tipos de domain - PROHIBIDO usar tipos de mongoose aquí ya
const userRepository = new MongooseUserRepository()


export const listUsersByIdUC = async (id:string) => {
    return await userRepository.readById(id)
}

export const listUserByAddressUC = async(address: string)=>{
    return await userRepository.findByAddress(address)
}

export const listUsersUC = async () => {
    return await userRepository.read()
}

export const createUserUC = async (data: Omit<UserBase, "id">) =>{
    return await userRepository.create(data)
}

export const findUserAndUpdateUC = async (filter?: FilterQuery<User> | undefined, update?: UpdateQuery<any> | undefined, options?: QueryOptions<any> | null | undefined)=> {
    return await userRepository.update(filter, update, options)
}
export const updateUserByIdUC = async (id:string, user?: UpdateQuery<UserBase> | undefined) => {
    return await userRepository.updateById(id, user)
}
export const deleteUserByIdUC = async (id: string) =>{
    return await userRepository.deleteById(id)
}


