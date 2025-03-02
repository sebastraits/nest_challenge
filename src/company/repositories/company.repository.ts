import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from './company.repository.interface';
import { ICompany } from '../interfaces/company';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(company: ICompany): Promise<Company> {
    return this.companyRepository.save(company);
  }

  async findOneByCuit(cuit: string): Promise<Company | null> {
    return this.companyRepository.findOne({ where: { cuit } });
  }

  async findRecentlyJoined(fromDate: Date): Promise<Company[]> {
    console.log('fromDate', fromDate);
    return this.companyRepository.find({
      where: {
        adhesionDate: MoreThanOrEqual(fromDate),
      },
    });
  }
}
