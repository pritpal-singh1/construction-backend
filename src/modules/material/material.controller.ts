import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('materials')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  @Permissions(Permission.READ_MATERIAL)
  findAll(@Query() filters: any) {
    return this.materialService.findAll(filters);
  }

  @Get(':id')
  @Permissions(Permission.READ_MATERIAL)
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(id);
  }

  @Post()
  @Permissions(Permission.CREATE_MATERIAL)
  create(@Body() createMaterialDto: any) {
    return this.materialService.create(createMaterialDto);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_MATERIAL)
  update(@Param('id') id: string, @Body() updateMaterialDto: any) {
    return this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_MATERIAL)
  remove(@Param('id') id: string) {
    return this.materialService.remove(id);
  }
}
