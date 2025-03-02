import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../repositories/company.repository.interface';
import { CompanyDto } from '../dto/conpany.dto';
import { InjectionEnum } from 'src/common/enums/injection';
import { subDays } from 'date-fns';

@Injectable()
export class CompanyService {
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
      transfers: [],
    });
  }

  async findRecentlyJoined(): Promise<Company[]> {
    const DAYS_TO_SHOW = 30;
    const fromDate = subDays(new Date(), DAYS_TO_SHOW);
    return await this.companyRepository.findRecentlyJoined(fromDate);
  }

  async findOneByCuit(cuit: string): Promise<Company | null> {
    return await this.companyRepository.findOneByCuit(cuit);
  }
}
