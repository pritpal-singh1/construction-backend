import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(filters?: any): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('project.materials', 'materials')
      .leftJoinAndSelect('project.bills', 'bills')
      .leftJoinAndSelect('project.payments', 'payments');

    if (filters?.status) {
      query.andWhere('project.status = :status', { status: filters.status });
    }

    if (filters?.type) {
      query.andWhere('project.type = :type', { type: filters.type });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['createdBy', 'materials', 'bills', 'payments'],
    });
  }

  async create(createProjectDto: any): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    const saved = await this.projectRepository.save(project);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(id: string, updateProjectDto: any): Promise<Project | null> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async getProjectStats(id: string) {
    const project = await this.findOne(id);
    
    if (!project) {
      return null;
    }
    
    const totalMaterialCost = project.materials?.reduce((sum, m) => sum + Number(m.totalCost), 0) || 0;
    const totalBillAmount = project.bills?.reduce((sum, b) => sum + Number(b.totalAmount), 0) || 0;
    const totalPaidAmount = project.payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    return {
      project,
      stats: {
        totalMaterialCost,
        totalBillAmount,
        totalPaidAmount,
        pendingAmount: totalBillAmount - totalPaidAmount,
      },
    };
  }
}
