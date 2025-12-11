import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async create(createRoleDto: any): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    const saved = await this.roleRepository.save(role);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(id: string, updateRoleDto: any): Promise<Role | null> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
