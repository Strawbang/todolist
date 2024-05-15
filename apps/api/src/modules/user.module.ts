import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/infrastructure/repositories/mongodb/user.schema';
import { UserController } from '../application/controllers/user.controller';
import { UserServiceInterface } from '../application/interfaces/user.service.interface';
import { UserService } from '../application/services/user.service';
import { UserRepositoryInterface } from '../domain/interfaces/user.repository.interface';
import { UserRepository } from '../infrastructure/repositories/mongodb/user.repository';

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
