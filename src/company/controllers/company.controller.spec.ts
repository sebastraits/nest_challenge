import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../services/company.service';
import { CompanyController } from './company.controller';
import { InjectionEnum } from 'src/common/enums/injection';
import { CompanyDto } from '../dto/conpany.dto';
import { Company } from '../entities/company.entity';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: InjectionEnum.COMPANY_SERVICE,
          useValue: {
            create: jest.fn(),
            findAddedLastMonth: jest.fn(),
            findWithTransfersLastMonth: jest.fn(),
          },
        },
        {
          provide: InjectionEnum.COMPANY_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(InjectionEnum.COMPANY_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('should return created company', async () => {
      const companyData: CompanyDto = {
        companyName: 'Test Company',
        cuit: '20259594880',
      };
      const expectedResult = new Company('Test Company', '20259594880');

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(companyData);
      expect(result).toEqual(expectedResult);
    });

    it('should validate input using validation pipe and throw BadRequestException by wrong cuit', async () => {
      const invalidDto = {
        companyName: 'Test Company',
        cuit: '2025959488',
      };

      const validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });

      try {
        await validationPipe.transform(invalidDto, {
          metatype: CompanyDto, // Replace with your DTO class
          type: 'body',
        });
      } catch (error) {
        const validationError = error as BadRequestException;
        expect(validationError.getResponse()).toEqual({
          error: 'Bad Request',
          message: ['cuit must be 11 characters long'],
          statusCode: 400,
        });
      }
    });

    it('should validate input using validation pipe and throw BadRequestException by wrong companyName', async () => {
      const invalidDto = {
        companyName: 'Te',
        cuit: '20259594880',
      };

      const validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });

      try {
        await validationPipe.transform(invalidDto, {
          metatype: CompanyDto, // Replace with your DTO class
          type: 'body',
        });
      } catch (error) {
        const validationError = error as BadRequestException;
        expect(validationError.getResponse()).toEqual({
          error: 'Bad Request',
          message: ['companyName must be at least 3 characters long'],
          statusCode: 400,
        });
      }
    });
  });

  describe('Recently added companies', () => {
    it('should return recently added companies', async () => {
      const companies: Company[] = [
        new Company('Test Company', '20259594880'),
        new Company('Test Company 2', '20259594881'),
      ];

      jest.spyOn(service, 'findAddedLastMonth').mockResolvedValue(companies);

      const result = await controller.findAddedLastMonth();

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
        .spyOn(service, 'findWithTransfersLastMonth')
        .mockResolvedValue(companies);

      const result = await controller.findWithTransfersLastMonth();

      expect(result).toEqual(companies);
    });
  });
});
