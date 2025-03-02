import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { CommonModule } from './common/common.module';
import AppDataSource from './common/database/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    CompanyModule,
    CommonModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
