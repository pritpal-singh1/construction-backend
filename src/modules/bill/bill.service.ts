import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from '../../entities/bill.entity';
import { BillItem } from '../../entities/bill-item.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(BillItem)
    private readonly billItemRepository: Repository<BillItem>,
  ) {}

  async findAll(filters?: any): Promise<Bill[]> {
    const query = this.billRepository.createQueryBuilder('bill')
      .leftJoinAndSelect('bill.project', 'project')
      .leftJoinAndSelect('bill.party', 'party')
      .leftJoinAndSelect('bill.items', 'items')
      .leftJoinAndSelect('bill.payments', 'payments');

    if (filters?.projectId) {
      query.andWhere('bill.projectId = :projectId', { projectId: filters.projectId });
    }

    if (filters?.status) {
      query.andWhere('bill.status = :status', { status: filters.status });
    }

    if (filters?.type) {
      query.andWhere('bill.type = :type', { type: filters.type });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Bill | null> {
    return this.billRepository.findOne({
      where: { id },
      relations: ['project', 'party', 'items', 'payments'],
    });
  }

  async create(createBillDto: any): Promise<Bill> {
    const { items, ...billData } = createBillDto;
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const gstAmount = (subtotal * billData.gstPercentage) / 100;
    const discountAmount = (subtotal * billData.discountPercentage) / 100;
    const totalAmount = subtotal + gstAmount - discountAmount + (billData.otherCharges || 0);

    const bill = this.billRepository.create({
      ...billData,
      subtotal,
      gstAmount,
      discountAmount,
      totalAmount,
      balanceAmount: totalAmount,
      paidAmount: 0,
    });

    const savedBill = await this.billRepository.save(bill);
    const finalBill = Array.isArray(savedBill) ? savedBill[0] : savedBill;

    // Create bill items
    if (items && items.length > 0) {
      const billItems = items.map(item => this.billItemRepository.create({
        ...item,
        amount: item.quantity * item.rate,
        bill: finalBill,
      }));
      await this.billItemRepository.save(billItems);
    }

    const result = await this.findOne(finalBill.id);
    return result!;
  }

  async update(id: string, updateBillDto: any): Promise<Bill | null> {
    await this.billRepository.update(id, updateBillDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.billRepository.delete(id);
  }

  async approveBill(id: string): Promise<Bill | null> {
    const bill = await this.findOne(id);
    if (bill) {
      bill.status = 'APPROVED' as any;
      await this.billRepository.save(bill);
    }
    return this.findOne(id);
  }

  async generateBillNumber(): Promise<string> {
    const count = await this.billRepository.count();
    return `BILL-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
  }
}
