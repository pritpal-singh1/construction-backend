import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Party } from './party.entity';
import { Bill } from './bill.entity';

export enum PaymentMode {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  BANK_TRANSFER = 'BANK_TRANSFER',
  UPI = 'UPI',
  CARD = 'CARD',
  OTHER = 'OTHER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  paymentNumber: string;

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMode,
    default: PaymentMode.CASH,
  })
  mode: PaymentMode;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.COMPLETED,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  referenceNumber: string;

  @Column({ nullable: true })
  chequeNumber: string;

  @Column({ nullable: true })
  chequeDate: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Project, project => project.payments)
  project: Project;

  @ManyToOne(() => Party, party => party.payments)
  party: Party;

  @ManyToOne(() => Bill, bill => bill.payments, { nullable: true })
  bill: Bill;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
