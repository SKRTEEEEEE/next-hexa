import { FilterQuery, Query, QueryOptions } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseDeleteByIdI, MongooseDeleteI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseDeleteByIdRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseDeleteByIdI{
  async deleteById(id: string): Promise<boolean> {
    await this.connect();
    const result: TBase & MongooseDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }
}
export class MongooseDeleteRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseDeleteI{
  async delete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>> {
    await this.connect();
    return await this.Model.findOneAndDelete(filter, options)
  }
}
