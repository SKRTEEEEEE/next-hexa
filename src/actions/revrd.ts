"use server"

// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕
//NOT CHECKED!

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const rv = async (path:string) => {
    revalidatePath(path)
}
export const rd = async (path:string) => {
    redirect(path)
}
export const rvrd = async (path:string)=> {
    revalidatePath(path)
    redirect(path)
}