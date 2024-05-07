export interface UserServiceInterface {
   getHello(): string;
   addUser(req: any): void;
}

export const UserServiceInterface = Symbol("UserServiceInterface");