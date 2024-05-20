import { ProjectController } from '@application/controllers/project.controller';
import { ProjectService } from '@application/services/project.service';
import { ProjectRepositoryInterface } from '@domain/interfaces/project.repository.interface';
import { ProjectServiceInterface } from '@domain/interfaces/project.service.interface';
import { ProjectRepository } from '@infrastructure/repositories/project.repository';
import { ProjectSchema } from '@infrastructure/schema/project.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [
    {
      provide: ProjectServiceInterface,
      useClass: ProjectService
    },
    {
      provide: ProjectRepositoryInterface,
      useClass: ProjectRepository
    }  
],
})
export class ProjectModule {}
