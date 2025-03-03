import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { CompanyController } from '../controllers/company.controller';
import { InjectionEnum } from '../../common/enums/injection';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: InjectionEnum.COMPANY_SERVICE,
          useClass: fakeCompanyService,
        },
        {
          provide: InjectionEnum.COMPANY_REPOSITORY,
          useClass: CompanyRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

class fakeCompanyService {}

class CompanyRepository {}
