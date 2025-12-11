import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from '../../entities/bill.entity';
import { BillItem } from '../../entities/bill-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillItem])],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
