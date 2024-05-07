import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  addUser(req: any) {
     throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'API TodoList !';
  }
}
