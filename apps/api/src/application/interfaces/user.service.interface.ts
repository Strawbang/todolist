export interface UserServiceInterface {
   register(username: string, password: string): any;
   login(username: string, password: string): any;
}

export const UserServiceInterface = Symbol("UserServiceInterface");