import { Module } from '@nestjs/common';
import { UserService } from 'src/application/user.service';
import { UserController } from '../application/user.controller';
import { UserServiceInterface } from '../application/user.service.interface';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{
    provide: UserServiceInterface,
    useClass: UserService
  }],
})
export class UserModule {}
