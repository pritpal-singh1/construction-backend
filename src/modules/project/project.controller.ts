import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('projects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @Permissions(Permission.READ_PROJECT)
  findAll(@Query() filters: any) {
    return this.projectService.findAll(filters);
  }

  @Get(':id')
  @Permissions(Permission.READ_PROJECT)
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Get(':id/stats')
  @Permissions(Permission.READ_PROJECT)
  getStats(@Param('id') id: string) {
    return this.projectService.getProjectStats(id);
  }

  @Post()
  @Permissions(Permission.CREATE_PROJECT)
  create(@Body() createProjectDto: any) {
    return this.projectService.create(createProjectDto);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_PROJECT)
  update(@Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_PROJECT)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
