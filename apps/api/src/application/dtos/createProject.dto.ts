import { Project } from "@domain/entities/project.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ownerId: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  readonly memberIds?: string[];

  static fromDomain(project: CreateProjectDto): Project {
    return {
      name: project.name,
      description: project.description,
      owner: project.ownerId,
    };
  }
}