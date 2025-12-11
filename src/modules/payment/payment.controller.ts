import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../../entities/role.entity';

@Controller('payments')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @Permissions(Permission.READ_PAYMENT)
  findAll(@Query() filters: any) {
    return this.paymentService.findAll(filters);
  }

  @Get(':id')
  @Permissions(Permission.READ_PAYMENT)
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Get('generate/number')
  @Permissions(Permission.CREATE_PAYMENT)
  generateNumber() {
    return this.paymentService.generatePaymentNumber();
  }

  @Post()
  @Permissions(Permission.CREATE_PAYMENT)
  create(@Body() createPaymentDto: any) {
    return this.paymentService.create(createPaymentDto);
  }

  @Put(':id')
  @Permissions(Permission.UPDATE_PAYMENT)
  update(@Param('id') id: string, @Body() updatePaymentDto: any) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_PAYMENT)
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
