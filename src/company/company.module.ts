import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { CompanyRepository } from './repositories/company.repository';
import { InjectionEnum } from '../../src/common/enums/injection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    {
      provide: InjectionEnum.COMPANY_SERVICE,
      useClass: CompanyService,
    },
    {
      provide: InjectionEnum.COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
