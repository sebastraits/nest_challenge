import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../repositories/company.repository.interface';
import { CompanyDto } from '../dto/conpany.dto';
import { InjectionEnum } from 'src/common/enums/injection';
import { ICompanyService } from './company.service.interface';
import { findOneMonthAgoDate } from 'src/common/helpers/date';
import * as moment from 'moment';

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

  async findAddedLastMonth(): Promise<Company[]> {
    const dateOneMonthAgo = findOneMonthAgoDate();
    const today = moment().toDate();
    console.log(dateOneMonthAgo, today);
    return await this.companyRepository.findAddedInDateRange(
      dateOneMonthAgo,
      today,
    );
  }

  async findWithTransfersLastMonth(): Promise<Company[]> {
    const dateOneMonthAgo = findOneMonthAgoDate();
    const today = moment().toDate();
    return await this.companyRepository.findWithTransfersInDateRange(
      dateOneMonthAgo,
      today,
    );
  }

  async findOneByCuit(cuit: string): Promise<Company | null> {
    return await this.companyRepository.findOneByCuit(cuit);
  }
}
