import { Project } from '@domain/entities/project.entity';

export interface ProjectRepositoryInterface {
   findById(id: string): Promise<Project | null>;
   findAll(): Promise<Project[]>;
   create(project: Project): Promise<Project>;
   update(id: string, project: Partial<Project>): Promise<Project | null>;
   delete(id: string): Promise<boolean>;
}

export const ProjectRepositoryInterface = Symbol("ProjectRepositoryInterface");