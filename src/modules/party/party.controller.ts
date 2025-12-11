import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('parties')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  @Permissions(Permission.READ_PARTY)
  findAll(@Query() filters: any) {
    return this.partyService.findAll(filters);
  }

  @Get(':id')
  @Permissions(Permission.READ_PARTY)
  findOne(@Param('id') id: string) {
    return this.partyService.findOne(id);
  }

  @Get(':id/balance')
  @Permissions(Permission.READ_PARTY)
  getBalance(@Param('id') id: string) {
    return this.partyService.getPartyBalance(id);
  }

  @Post()
  @Permissions(Permission.CREATE_PARTY)
  create(@Body() createPartyDto: any) {
    return this.partyService.create(createPartyDto);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_PARTY)
  update(@Param('id') id: string, @Body() updatePartyDto: any) {
    return this.partyService.update(id, updatePartyDto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_PARTY)
  remove(@Param('id') id: string) {
    return this.partyService.remove(id);
  }
}
