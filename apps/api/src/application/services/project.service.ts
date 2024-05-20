import { Project } from '@domain/entities/project.entity';
import { ProjectRepositoryInterface } from '@domain/interfaces/project.repository.interface';
import { ProjectServiceInterface } from '@domain/interfaces/project.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService implements ProjectServiceInterface {
  constructor(@Inject(ProjectRepositoryInterface) private readonly projectRepository: ProjectRepositoryInterface) {}
  updateProject(id: string, project: Partial<Project>): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  deleteProject(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async createProject(project: Project): Promise<Project> {
    return this.projectRepository.create(project);
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
