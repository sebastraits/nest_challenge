import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../services/company.service';
import { InjectionEnum } from 'src/common/enums/injection';
import { CompanyDto } from '../dto/conpany.dto';
import { Company } from '../entities/company.entity';
import { ConflictException } from '@nestjs/common';
import { CompanyController } from '../controllers/company.controller';
import { CompanyRepository } from '../repositories/company.repository';
import * as dateHelper from '../../../src/common/helpers/date';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: InjectionEnum.COMPANY_SERVICE,
          useClass: CompanyService,
        },
        {
          provide: InjectionEnum.COMPANY_REPOSITORY,
          useValue: {
            create: jest.fn(),
            findOneByCuit: jest.fn(),
            findRecentlyAdded: jest.fn(),
            findWithRecentTransfers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(InjectionEnum.COMPANY_SERVICE);
    repository = module.get<CompanyRepository>(
      InjectionEnum.COMPANY_REPOSITORY,
    );
    jest
      .spyOn(dateHelper, 'findOneMonthAgoDate')
      .mockReturnValue(new Date('2025-01-01'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should return created company', async () => {
      const companyData: CompanyDto = {
        companyName: 'Test Company',
        cuit: '20259594880',
      };
      const expectedResult = new Company('Test Company', '20259594880');

      jest.spyOn(repository, 'findOneByCuit').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(expectedResult);
      const result = await service.create(companyData);
      expect(result).toEqual(expectedResult);
    });

    it('should return a conflict error because company already exists', async () => {
      const companyData: CompanyDto = {
        companyName: 'Test Company',
        cuit: '20259594880',
      };
      const findedCompany = new Company('Test Company', '20259594880');

      jest.spyOn(repository, 'findOneByCuit').mockResolvedValue(findedCompany);

      try {
        await service.create(companyData);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('Recently added companies', () => {
    it('should return recently added companies', async () => {
      const companies: Company[] = [
        new Company('Test Company', '20259594880'),
        new Company('Test Company 2', '20259594881'),
      ];

      jest.spyOn(repository, 'findRecentlyAdded').mockResolvedValue(companies);

      const result = await service.findAddedLastMonth();
      expect(result).toEqual(companies);
    });
  });

  describe('Transfers recently', () => {
    it('should return companies that made transfers recently', async () => {
      const companies: Company[] = [
        new Company('Test Company', '20259594880'),
        new Company('Test Company 2', '20259594881'),
      ];

      jest
        .spyOn(repository, 'findWithRecentTransfers')
        .mockResolvedValue(companies);

      const result = await service.findWithTransfersLastMonth();
      expect(result).toEqual(companies);
    });
  });
});
