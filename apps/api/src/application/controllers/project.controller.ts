import { CreateProjectDto } from '@application/dtos/createProject.dto';
import { Project } from '@domain/entities/project.entity';
import { ProjectServiceInterface } from '@domain/interfaces/project.service.interface';
import { Body, Controller, Get, Inject, Param, Post, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('projects')
export class ProjectController {
  constructor(@Inject(ProjectServiceInterface) private readonly projectService: ProjectServiceInterface) {}

  @Post()
  @ApiResponse({ status: StatusCodes.CREATED, description: 'The record has been successfully created.' })
  @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, description: 'Internal server error.' })
  async createProject(@Body() createProjectDto: CreateProjectDto, @Res() res: Response): Promise<Response> {
    try {
      const project = await this.projectService.createProject(CreateProjectDto.fromDomain(createProjectDto));
      return res.status(StatusCodes.CREATED).json(Project.toDto(project));
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  @ApiResponse({ status: StatusCodes.OK, description: 'The record has been successfully retrieved.' })
  @ApiResponse({ status: StatusCodes.NOT_FOUND, description: 'Project not found.' })
  async getProjectById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const project = await this.projectService.getProjectById(id);
      if (project) {
        return res.status(StatusCodes.OK).json(Project.toDto(project));
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  @Get()
  @ApiResponse({ status: StatusCodes.OK, description: 'The records have been successfully retrieved.' })
  @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, description: 'Internal server error.' })
  async getAllProjects(@Res() res: Response): Promise<Response> {
    try {
      const projects = await this.projectService.getAllProjects();
      return res.status(StatusCodes.OK).json(projects.map(Project.toDto));
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
}
