import { FilterQuery } from "mongoose";
import { MongooseBaseRepository } from "./base.repository";
import { ProjectionType } from "mongoose";
import { QueryOptions } from "mongoose";
import { Query } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseReadI } from "../types/implementations";

export class MongooseReadRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseReadI<TBase>{
    // -> Read All
    async read(
      filter?: FilterQuery<TBase & MongooseBase>,
      projection?: ProjectionType<any> | null,
      options?: QueryOptions<any> | null
    ): Promise<Query<(TBase & MongooseBase)[], any, {}, any, "find", {}>> {
      try {
        await this.connect();
        const docs = await this.Model.find(filter || {}, projection, options) // Usa un objeto vacío si filter es undefined
        return docs.map(user=>this.documentToPrimary(user))
      } catch (error) {
        console.error("Error al leer documentos:", error);
        throw new Error("Error en la operación de lectura");
      }
    }
}