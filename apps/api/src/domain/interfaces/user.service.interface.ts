import { User } from "@domain/entities/user.entity";

export interface UserServiceInterface {
   register(username: string, password: string, email:string): Promise<User>;
   login(username: string, password: string): Promise<User | null>;
}

export const UserServiceInterface = Symbol("UserServiceInterface");