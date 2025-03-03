import { Transfer } from 'src/transfer/entities/transfer.entity';

export interface ICompany {
  companyName: string;
  cuit: string;
  adhesionDate: Date;
  transfers?: Transfer[];
}
