import { CompanyDto } from '../dto/conpany.dto';
import { Company } from '../entities/company.entity';

export interface ICompanyService {
  create(company: CompanyDto): Promise<Company>;
  findAddedLastMonth(): Promise<Company[]>;
  findOneByCuit(cuit: string): Promise<Company | null>;
  findWithTransfersLastMonth(): Promise<Company[]>;
}
