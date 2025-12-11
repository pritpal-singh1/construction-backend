import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions(Permission.READ_USER)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Permissions(Permission.READ_USER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_USER)
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_USER)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
