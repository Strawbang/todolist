import { Project } from '@domain/entities/project.entity';
import { Model } from 'mongoose';

export class ProjectRepository {
  constructor(private readonly projectModel: Model<Project>) {}

  async create(name: string, description: string, owner: string, members: string[]): Promise<Project> {
    return this.projectModel.create({ name, description, owner, members });
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }
}
