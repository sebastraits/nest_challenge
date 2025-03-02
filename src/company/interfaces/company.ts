import { Transfer } from 'src/transfer/entities/transfer.entity';
import { CompanyDto } from '../dto/conpany.dto';

export interface ICompany extends CompanyDto {
  adhesionDate: Date;
  transfers?: Transfer[];
}
