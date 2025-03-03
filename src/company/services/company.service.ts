import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../repositories/company.repository.interface';
import { CompanyDto } from '../dto/conpany.dto';
import { InjectionEnum } from '../../../src/common/enums/injection';
import { ICompanyService } from './company.service.interface';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject(InjectionEnum.COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(company: CompanyDto): Promise<Company> {
    const existingCompany = await this.findOneByCuit(company.cuit);
    if (existingCompany) {
      throw new ConflictException('Company already exists');
    }
    const adhesionDate = new Date();
    return await this.companyRepository.create({
      ...company,
      adhesionDate,
    });
  }

  async findRecentlyAdded(): Promise<Company[]> {
    const DAYS_TO_SHOW = 30; // This could be passed as a parameter if the EP needs to be extended.
    const fromDate = new Date(Date.now() - DAYS_TO_SHOW * 24 * 60 * 60 * 1000);
    return await this.companyRepository.findRecentlyAdded(fromDate);
  }

  async findWithRecentTransfers(): Promise<Company[]> {
    const DAYS_TO_SHOW = 30; // This could be passed as a parameter if the EP needs to be extended.
    const fromDate = new Date(Date.now() - DAYS_TO_SHOW * 24 * 60 * 60 * 1000);
    return await this.companyRepository.findWithRecentTransfers(fromDate);
  }

  async findOneByCuit(cuit: string): Promise<Company | null> {
    return await this.companyRepository.findOneByCuit(cuit);
  }
}
