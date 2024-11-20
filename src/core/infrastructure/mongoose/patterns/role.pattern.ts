import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { MongooseDeleteByIdRepository, MongooseDeleteRepository } from "../implementations/delete.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { MongooseCRURepository } from "../implementations/cru.repository";

// crruudd 

export abstract class MongooseRolePattern<
TBase,
TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions> implements RoleRepository<TBase>{
  private cruRepo: MongooseCRURepository<TBase>
  private readRepo: MongooseReadRepository<TBase>;
  private updateRepo: MongooseUpdateRepository<TBase>
  private deleteByIdRepo: MongooseDeleteByIdRepository<TBase>;
  private deleteRepo: MongooseDeleteRepository<TBase>

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteByIdRepo = new MongooseDeleteByIdRepository(this.Model);
    this.deleteRepo = new MongooseDeleteRepository(this.Model)
    this.updateRepo = new MongooseUpdateRepository(this.Model)
    this.cruRepo = new MongooseCRURepository(this.Model)
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
  async updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  )
    : Promise<TBase & MongooseBase | null> {
      return await this.cruRepo.updateById(id,updateData,options)
    }
  // Implementar el método delete
  async deleteById(id: string): Promise<boolean> {
    return this.deleteByIdRepo.deleteById(id);
    
  }
  async read(
    filter?: FilterQuery<TBase & MongooseBase>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<(TBase & MongooseBase)[] | null> {
    // Asumiendo que tienes un método read en MongooseBaseRepository o necesitas implementarlo
    return this.readRepo.read(filter, projection, options);
  }
  async delete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>>{
    return this.deleteRepo.delete(filter, options)
  }
  async update(filter?: FilterQuery<TBase & MongooseBase> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TBase & MongooseBase | null>{
    return this.updateRepo.update(filter, update, options)
  }
}