import { User, UserBase, UserDocument } from '@/core/domain/entities/User';
import { UserModel } from '@/models/user-role-schema';
import { DatabaseOperationError } from '@/core/domain/errors/main';
import { MongooseUserPattern } from './mongoose-base';
import { UserRepository } from '@/core/application/interfaces/entities/user';

interface UserTransformOptions {
    roleId?: (value: any) => string | null;
  }

export class MongooseUserRepository extends MongooseUserPattern<UserBase, User, UserDocument, UserTransformOptions> implements UserRepository<UserBase, User, UserDocument>{
    constructor(){
        super(UserModel, {
            roleId: (value) => value?.toString() || null,
          })
    }
        async deleteRoleId(id: string): Promise<void> {
        await this.connect()
        const result = await this.Model.updateOne({ _id: id }, { $set: { roleId: null } });
        if (result.matchedCount === 0) throw new DatabaseOperationError(`User with id ${id} not found`);
        }
        async findByAddress(address: string): Promise<User | null> {
        await this.connect()
        const user = await this.Model.findOne({address})
        return user ? this.documentToPrimary(user) : null        
        }
        async findAll(): Promise<User[] | null> {
        await this.connect()
        const users = await this.Model.find()
        return users.length > 0 ? users.map(user=>this.documentToPrimary(user)):null
        }
}