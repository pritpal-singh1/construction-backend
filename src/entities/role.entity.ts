import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

export enum Permission {
  // User Management
  CREATE_USER = 'CREATE_USER',
  READ_USER = 'READ_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',

  // Project Management
  CREATE_PROJECT = 'CREATE_PROJECT',
  READ_PROJECT = 'READ_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',

  // Material Management
  CREATE_MATERIAL = 'CREATE_MATERIAL',
  READ_MATERIAL = 'READ_MATERIAL',
  UPDATE_MATERIAL = 'UPDATE_MATERIAL',
  DELETE_MATERIAL = 'DELETE_MATERIAL',

  // Party Management
  CREATE_PARTY = 'CREATE_PARTY',
  READ_PARTY = 'READ_PARTY',
  UPDATE_PARTY = 'UPDATE_PARTY',
  DELETE_PARTY = 'DELETE_PARTY',

  // Billing Management
  CREATE_BILL = 'CREATE_BILL',
  READ_BILL = 'READ_BILL',
  UPDATE_BILL = 'UPDATE_BILL',
  DELETE_BILL = 'DELETE_BILL',
  APPROVE_BILL = 'APPROVE_BILL',

  // Payment Management
  CREATE_PAYMENT = 'CREATE_PAYMENT',
  READ_PAYMENT = 'READ_PAYMENT',
  UPDATE_PAYMENT = 'UPDATE_PAYMENT',
  DELETE_PAYMENT = 'DELETE_PAYMENT',

  // Report Management
  READ_REPORT = 'READ_REPORT',
  EXPORT_REPORT = 'EXPORT_REPORT',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array')
  permissions: string[];

  @OneToMany(() => User, user => user.role)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
