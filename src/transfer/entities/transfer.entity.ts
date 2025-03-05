import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/common/database/base.entity';
import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Transfer extends Base {
  // CreatedAt and UpdatedAt are already handled by Base
  @ApiProperty({
    description: 'The amount of the transfer',
  })
  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    description: 'The debit account of the transfer',
  })
  @Column({ nullable: false, type: 'varchar', length: 100 })
  debitAccount: string;

  @ApiProperty({
    description: 'The credit account of the transfer',
  })
  @Column({ nullable: false, type: 'varchar', length: 100 })
  creditAccount: string;

  @ApiProperty({
    description: 'The company of the transfer',
  })
  @ManyToOne(() => Company, (company) => company.transfers)
  company: Company;
}
