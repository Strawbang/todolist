import { Project } from "@domain/entities/project.entity";

export interface ProjectServiceInterface {
   getProjectById(id: string): Promise<Project | null>;
   getAllProjects(): Promise<Project[]>;
   createProject(project: Project): Promise<Project>;
   updateProject(id: string, project: Partial<Project>): Promise<Project | null>;
   deleteProject(id: string): Promise<boolean>;
}

export const ProjectServiceInterface = Symbol("ProjectServiceInterface");