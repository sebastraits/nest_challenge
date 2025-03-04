import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

  async findAddedInDateRange(fromDate: Date, toDate: Date): Promise<Company[]> {
    return this.companyRepository.find({
      where: {
        adhesionDate: Between(fromDate, toDate),
      },
    });
  }

  async findWithTransfersInDateRange(
    fromDate: Date,
    toDate: Date,
  ): Promise<Company[]> {
    return this.companyRepository.find({
      relations: ['transfers'],
      where: {
        transfers: {
          createdAt: Between(fromDate, toDate),
        },
      },
    });
  }
}
