import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from '../../entities/party.entity';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
  ) {}

  async findAll(filters?: any): Promise<Party[]> {
    const query = this.partyRepository.createQueryBuilder('party');

    if (filters?.type) {
      query.andWhere('party.type = :type', { type: filters.type });
    }

    if (filters?.isActive !== undefined) {
      query.andWhere('party.isActive = :isActive', { isActive: filters.isActive });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Party | null> {
    return this.partyRepository.findOne({
      where: { id },
      relations: ['materials', 'bills', 'payments'],
    });
  }

  async create(createPartyDto: any): Promise<Party> {
    const party = this.partyRepository.create(createPartyDto);
    const saved = await this.partyRepository.save(party);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async update(id: string, updatePartyDto: any): Promise<Party | null> {
    await this.partyRepository.update(id, updatePartyDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.partyRepository.delete(id);
  }

  async getPartyBalance(id: string) {
    const party = await this.findOne(id);
    
    if (!party) {
      return null;
    }
    
    const totalBills = party.bills?.reduce((sum, b) => sum + Number(b.totalAmount), 0) || 0;
    const totalPayments = party.payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    return {
      party,
      balance: {
        totalBills,
        totalPayments,
        outstanding: totalBills - totalPayments,
      },
    };
  }
}
