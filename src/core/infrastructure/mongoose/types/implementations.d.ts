import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase } from ".";

export type MongooseCRUI<
  TBase,
> = {
  create(
    data: Omit<TBase, 'id'>
  )
    : Promise<TBase & MongooseBase>
  readById(
    id: string
  )
    : Promise<TBase & MongooseBase | null>
  updateById(
    id: string,
    updateData?: Partial<TBase> | undefined,
    options?: any | null | undefined
  )
    : Promise<TBase & MongooseBase | null>
}
export type MongooseDeleteI = {
  delete(
    filter?: Partial<TBase & MongooseBase> | null | undefined, 
    options?: any | null | undefined
  ): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>>
}
export type MongooseDeleteByIdI = {
  deleteById(
    id: string
  )
    : Promise<boolean>
}
export type MongooseReadI<TBase> = {
  read(
    filter?: FilterQuery<TBase & MongooseBase>,
    projection?: ProjectionType<any> | null | undefined,
    options?: QueryOptions<any> | null | undefined
  )
    : Query<(TBase & MongooseBase)[] | null>
}
export type MongooseUpdateI<TBase> = {
  update(
    filter?: FilterQuery<TBase & MongooseBase> | undefined,
    update?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<TBase> | null | undefined
  )
    : Query<(TBase & MongooseBase)[], any, {}, any, "find", {}>
}