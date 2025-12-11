import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { Bill } from '../../entities/bill.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async findAll(filters?: any): Promise<Payment[]> {
    const query = this.paymentRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.project', 'project')
      .leftJoinAndSelect('payment.party', 'party')
      .leftJoinAndSelect('payment.bill', 'bill');

    if (filters?.projectId) {
      query.andWhere('payment.projectId = :projectId', { projectId: filters.projectId });
    }

    if (filters?.partyId) {
      query.andWhere('payment.partyId = :partyId', { partyId: filters.partyId });
    }

    if (filters?.mode) {
      query.andWhere('payment.mode = :mode', { mode: filters.mode });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['project', 'party', 'bill'],
    });
  }

  async create(createPaymentDto: any): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    const savedPayment = await this.paymentRepository.save(payment);
    const finalPayment = Array.isArray(savedPayment) ? savedPayment[0] : savedPayment;

    // Update bill if payment is linked to a bill
    if (createPaymentDto.billId) {
      const bill = await this.billRepository.findOne({
        where: { id: createPaymentDto.billId },
      });

      if (bill) {
        bill.paidAmount = Number(bill.paidAmount) + Number(createPaymentDto.amount);
        bill.balanceAmount = Number(bill.totalAmount) - Number(bill.paidAmount);

        if (bill.balanceAmount === 0) {
          bill.status = 'PAID' as any;
        } else if (bill.paidAmount > 0) {
          bill.status = 'PARTIALLY_PAID' as any;
        }

        await this.billRepository.save(bill);
      }
    }

    const result = await this.findOne(finalPayment.id);
    return result!;
  }

  async update(id: string, updatePaymentDto: any): Promise<Payment | null> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    // Should also reverse the bill payment if linked
    const payment = await this.findOne(id);
    
    if (!payment) {
      return;
    }
    
    if (payment.bill) {
      const bill = await this.billRepository.findOne({
        where: { id: payment.bill.id },
      });

      if (bill) {
        bill.paidAmount = Number(bill.paidAmount) - Number(payment.amount);
        bill.balanceAmount = Number(bill.totalAmount) - Number(bill.paidAmount);
        
        if (bill.balanceAmount === bill.totalAmount) {
          bill.status = 'PENDING' as any;
        } else if (bill.paidAmount > 0) {
          bill.status = 'PARTIALLY_PAID' as any;
        }

        await this.billRepository.save(bill);
      }
    }

    await this.paymentRepository.delete(id);
  }

  async generatePaymentNumber(): Promise<string> {
    const count = await this.paymentRepository.count();
    return `PAY-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
  }
}
