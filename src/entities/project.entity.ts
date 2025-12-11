import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Bill } from './bill.entity';
import { Material } from './material.entity';
import { Payment } from './payment.entity';

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ProjectType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  RENOVATION = 'RENOVATION',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.RESIDENTIAL,
  })
  type: ProjectType;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  @Column({ type: 'text' })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  estimatedCost: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  actualCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  areaInSqFt: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  estimatedEndDate: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  @Column({ nullable: true })
  clientName: string;

  @Column({ nullable: true })
  clientPhone: string;

  @Column({ nullable: true })
  clientEmail: string;

  @Column({ nullable: true })
  contractorName: string;

  @Column({ nullable: true })
  architectName: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, user => user.projects)
  createdBy: User;

  @OneToMany(() => Material, material => material.project)
  materials: Material[];

  @OneToMany(() => Bill, bill => bill.project)
  bills: Bill[];

  @OneToMany(() => Payment, payment => payment.project)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
