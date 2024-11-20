import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { MongooseCRURepository } from "../implementations/cru.repository";
import { MongooseDeleteRepository } from "../implementations/delete.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { MongooseCRRUUD2 } from "../types/patterns";

// -> crruud v2 - (not used still -old tech.pattern)

export abstract class MongooseCRRUUD2Pattern<
  TBase,
  TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions> implements MongooseCRRUUD2<TBase> {
  private cruRepo: MongooseCRURepository<TBase>
  private readRepo: MongooseReadRepository<TBase>;
  private deleteRepo: MongooseDeleteRepository<TBase>
  private updateRepo: MongooseUpdateRepository<TBase>


  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);
    this.cruRepo = new MongooseCRURepository(this.Model)
    this.readRepo = new MongooseReadRepository(this.Model);
    this.updateRepo = new MongooseUpdateRepository(this.Model)
    this.deleteRepo = new MongooseDeleteRepository(this.Model)
  }
  async create(
    data: Omit<TBase, 'id'>
  )
    : Promise<TBase & MongooseBase> {
    return await this.cruRepo.create(data)
  }
  async readById(
    id: string
  )
    : Promise<TBase & MongooseBase | null> {
    return await this.cruRepo.readById(id)
  }
  async read(
    filter?: FilterQuery<TBase & MongooseBase>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<(TBase & MongooseBase)[] | null> {
    return this.readRepo.read(filter, projection, options);
  }
  async updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  )
    : Promise<TBase & MongooseBase | null> {
    return await this.cruRepo.updateById(id, updateData, options)
  }
  async update(filter?: FilterQuery<TBase & MongooseBase> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TBase & MongooseBase | null> {
    return await this.updateRepo.update(filter, update, options)
  }
  async delete(
    filter?: Partial<TBase & MongooseBase> | null | undefined,
    options?: any | null | undefined
  ): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>> {
    return this.deleteRepo.delete(filter, options)
  }
}
