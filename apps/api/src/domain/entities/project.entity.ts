import { CreateProjectDto } from '@application/dtos/createProject.dto';

export class Project {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly owner: string,
    public readonly members?: string[],
  ) {}

  static toDto(project: Project): CreateProjectDto {
    return {
      name: project.name,
      description: project.description,
      ownerId: project.owner,
    };
  }
}
