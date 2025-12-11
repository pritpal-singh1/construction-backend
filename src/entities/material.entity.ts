import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Party } from './party.entity';

export enum MaterialUnit {
  KG = 'KG',
  QUINTAL = 'QUINTAL',
  TON = 'TON',
  LITRE = 'LITRE',
  PIECE = 'PIECE',
  BOX = 'BOX',
  BAG = 'BAG',
  SQ_FT = 'SQ_FT',
  SQ_MTR = 'SQ_MTR',
  CUBIC_FT = 'CUBIC_FT',
  CUBIC_MTR = 'CUBIC_MTR',
  RUNNING_FT = 'RUNNING_FT',
  RUNNING_MTR = 'RUNNING_MTR',
}

export enum MaterialCategory {
  CEMENT = 'CEMENT',
  STEEL = 'STEEL',
  SAND = 'SAND',
  AGGREGATE = 'AGGREGATE',
  BRICKS = 'BRICKS',
  TILES = 'TILES',
  PAINT = 'PAINT',
  ELECTRICAL = 'ELECTRICAL',
  PLUMBING = 'PLUMBING',
  HARDWARE = 'HARDWARE',
  WOOD = 'WOOD',
  GLASS = 'GLASS',
  ALUMINUM = 'ALUMINUM',
  OTHER = 'OTHER',
}

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MaterialCategory,
    default: MaterialCategory.OTHER,
  })
  category: MaterialCategory;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: MaterialUnit,
    default: MaterialUnit.PIECE,
  })
  unit: MaterialUnit;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  ratePerUnit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalCost: number;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column({ nullable: true })
  invoiceNumber: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  specification: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Project, project => project.materials)
  project: Project;

  @ManyToOne(() => Party, party => party.materials, { nullable: true })
  supplier: Party;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
