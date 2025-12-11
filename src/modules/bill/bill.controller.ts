import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BillService } from './bill.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('bills')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  @Permissions(Permission.READ_BILL)
  findAll(@Query() filters: any) {
    return this.billService.findAll(filters);
  }

  @Get(':id')
  @Permissions(Permission.READ_BILL)
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Get('generate/number')
  @Permissions(Permission.CREATE_BILL)
  generateNumber() {
    return this.billService.generateBillNumber();
  }

  @Post()
  @Permissions(Permission.CREATE_BILL)
  create(@Body() createBillDto: any) {
    return this.billService.create(createBillDto);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_BILL)
  update(@Param('id') id: string, @Body() updateBillDto: any) {
    return this.billService.update(id, updateBillDto);
  }

  @Put(':id/approve')
  @Permissions(Permission.APPROVE_BILL)
  approve(@Param('id') id: string) {
    return this.billService.approveBill(id);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_BILL)
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
