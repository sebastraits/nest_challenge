import { Company } from '../entities/company.entity';
import { ICompany } from '../interfaces/company';

export interface ICompanyRepository {
  create(company: ICompany): Promise<Company>;
  findOneByCuit(cuit: string): Promise<Company | null>;
  findAddedInDateRange(fromDate: Date, toDate: Date): Promise<Company[]>;
  findWithTransfersInDateRange(
    fromDate: Date,
    toDate: Date,
  ): Promise<Company[]>;
}
