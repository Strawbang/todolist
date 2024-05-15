import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user'),
    UserModule
  ],
})
export class AppModule {}
