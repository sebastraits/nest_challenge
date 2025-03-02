import { Base } from 'src/common/database/base.entity';
import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Transfer extends Base {
  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  debitAccount: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  creditAccount: string;

  @ManyToOne(() => Company, (company) => company.transfers)
  company: Company;
}
