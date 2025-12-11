import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async findAll(filters?: any): Promise<Material[]> {
    const query = this.materialRepository.createQueryBuilder('material')
      .leftJoinAndSelect('material.project', 'project')
      .leftJoinAndSelect('material.supplier', 'supplier');

    if (filters?.projectId) {
      query.andWhere('material.projectId = :projectId', { projectId: filters.projectId });
    }

    if (filters?.category) {
      query.andWhere('material.category = :category', { category: filters.category });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Material | null> {
    return this.materialRepository.findOne({
      where: { id },
      relations: ['project', 'supplier'],
    });
  }

  async create(createMaterialDto: any): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    const saved = await this.materialRepository.save(material);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(id: string, updateMaterialDto: any): Promise<Material | null> {
    await this.materialRepository.update(id, updateMaterialDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.materialRepository.delete(id);
  }
}
