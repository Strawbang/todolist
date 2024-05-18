import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/interfaces/user.repository.interface';

export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(username: string, password: string): Promise<User> {
    const createdUser = new this.userModel({ username, password });
    return createdUser.save();
  }
}