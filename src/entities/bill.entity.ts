import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Party } from './party.entity';
import { BillItem } from './bill-item.entity';
import { Payment } from './payment.entity';

export enum BillStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum BillType {
  MATERIAL = 'MATERIAL',
  LABOR = 'LABOR',
  EQUIPMENT = 'EQUIPMENT',
  SERVICES = 'SERVICES',
  MISCELLANEOUS = 'MISCELLANEOUS',
}

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  billNumber: string;

  @Column({
    type: 'enum',
    enum: BillType,
    default: BillType.MATERIAL,
  })
  type: BillType;

  @Column({ type: 'date' })
  billDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  invoiceNumber: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  gstPercentage: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  gstAmount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discountPercentage: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  otherCharges: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balanceAmount: number;

  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.PENDING,
  })
  status: BillStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  termsAndConditions: string;

  @ManyToOne(() => Project, project => project.bills)
  project: Project;

  @ManyToOne(() => Party, party => party.bills)
  party: Party;

  @OneToMany(() => BillItem, billItem => billItem.bill, { cascade: true })
  items: BillItem[];

  @OneToMany(() => Payment, payment => payment.bill)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
