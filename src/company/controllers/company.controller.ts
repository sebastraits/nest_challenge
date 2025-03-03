import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Get,
  SerializeOptions,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { CompanyDto } from '../dto/conpany.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Company } from '../entities/company.entity';
import {
  companyExample,
  companyPostBadRequestExample,
  companyPostConflictExample,
} from 'src/common/swagger/responseExamples/company';
import { InjectionEnum } from 'src/common/enums/injection';
import { ICompanyService } from '../services/company.service.interface';

@Controller('/company')
export class CompanyController {
  constructor(
    @Inject(InjectionEnum.COMPANY_SERVICE)
    private readonly companyService: ICompanyService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Company })
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Company,
    isArray: false,
    example: companyExample,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: companyPostBadRequestExample,
  })
  @ApiConflictResponse({
    description: 'Company already exists',
    example: companyPostConflictExample,
  })
  create(@Body() companyDto: CompanyDto): Promise<Company> {
    return this.companyService.create(companyDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Company })
  @Get('/recently-added')
  @ApiOkResponse({
    description: 'Ok',
    type: Company,
    isArray: true,
    example: [companyExample],
  })
  findRecentlyAdded(): Promise<Company[]> {
    return this.companyService.findRecentlyAdded();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Company })
  @Get('/with-recent-transfers')
  @ApiOkResponse({
    description: 'Ok',
    type: Company,
    isArray: true,
    example: [companyExample],
  })
  findWithRecentTransfers(): Promise<Company[]> {
    return this.companyService.findWithRecentTransfers();
  }
}
