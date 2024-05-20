import { User } from '@domain/entities/user.entity';

export interface UserRepositoryInterface {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string, password: string, email: string): Promise<User>;
}

export const UserRepositoryInterface = Symbol("UserRepositoryInterface");