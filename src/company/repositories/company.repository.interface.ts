import { Company } from '../entities/company.entity';
import { ICompany } from '../interfaces/company';

export interface ICompanyRepository {
  create(company: ICompany): Promise<Company>;
  findOneByCuit(cuit: string): Promise<Company | null>;
  findRecentlyAdded(fromDate: Date): Promise<Company[]>;
  findWithRecentTransfers(fromDate: Date): Promise<Company[]>;
}
