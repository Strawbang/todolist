import { User } from '@domain/entities/user.entity';
import { UserRepositoryInterface } from '@domain/interfaces/user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async createUser(username: string, password: string, email:string): Promise<User> {
    const createdUser = new this.userModel({ username, password, email });
    return await createdUser.save();
  }
}