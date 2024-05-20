import { ProjectModule } from '@module/project.module';
import { UserModule } from '@module/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user'),
    UserModule,
    ProjectModule
  ],
})
export class AppModule {}
