import { Base } from '../../common/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Transfer } from '../../transfer/entities/transfer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Company extends Base {
  // CreatedAt and UpdatedAt are already handled by Base
  @ApiProperty({
    description: 'The name of the company',
  })
  @Column({ nullable: false, type: 'varchar', length: 255 })
  companyName: string;

  @ApiProperty({
    description: 'The cuit of the company',
  })
  @Column({ nullable: false, type: 'char', length: 11 })
  cuit: string;

  @ApiProperty({
    description: 'The adhesion date of the company',
  })
  @Column({ nullable: false, type: 'date' })
  adhesionDate: Date;

  @ApiProperty({
    description: 'The transfers of the company',
  })
  @OneToMany(() => Transfer, (transfer) => transfer.company)
  transfers: Transfer[];

  constructor(companyName: string, cuit: string) {
    super();
    this.companyName = companyName;
    this.cuit = cuit;
    this.adhesionDate = new Date();
  }
}
