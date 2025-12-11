import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Material } from './material.entity';
import { Bill } from './bill.entity';
import { Payment } from './payment.entity';

export enum PartyType {
  SUPPLIER = 'SUPPLIER',
  CONTRACTOR = 'CONTRACTOR',
  SUBCONTRACTOR = 'SUBCONTRACTOR',
  LABOR = 'LABOR',
  CONSULTANT = 'CONSULTANT',
  CLIENT = 'CLIENT',
  OTHER = 'OTHER',
}

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PartyType,
    default: PartyType.SUPPLIER,
  })
  type: PartyType;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  alternatePhone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  ifscCode: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  openingBalance: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  currentBalance: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Material, material => material.supplier)
  materials: Material[];

  @OneToMany(() => Bill, bill => bill.party)
  bills: Bill[];

  @OneToMany(() => Payment, payment => payment.party)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
