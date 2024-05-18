import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../application/controllers/user.controller';
import { UserServiceInterface } from '../application/interfaces/user.service.interface';
import { UserService } from '../application/services/user.service';
import { UserRepositoryInterface } from '../domain/interfaces/user.repository.interface';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { UserSchema } from '../infrastructure/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceInterface,
      useClass: UserService
    },
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository
    }  
],
})
export class UserModule {}
