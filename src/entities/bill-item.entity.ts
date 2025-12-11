import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bill } from './bill.entity';

@Entity('bill_items')
export class BillItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  rate: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @ManyToOne(() => Bill, bill => bill.items, { onDelete: 'CASCADE' })
  bill: Bill;
}
