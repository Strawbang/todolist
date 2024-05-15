import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string, password: string): Promise<User>;
}

export const UserRepositoryInterface = Symbol("UserRepositoryInterface");