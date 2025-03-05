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
  ApiOperation,
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
  @ApiOperation({
    summary: 'Generates the adhesion of a company',
  })
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
  @Get('/added-last-month')
  @ApiOperation({
    summary: 'Returns the companies added in the last month',
  })
  @ApiOkResponse({
    description: 'Ok',
    type: Company,
    isArray: true,
    example: [companyExample],
  })
  findAddedLastMonth(): Promise<Company[]> {
    return this.companyService.findAddedLastMonth();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Company })
  @Get('/with-transfers-last-month')
  @ApiOperation({
    summary: 'Returns the companies with transfers in the last month',
  })
  @ApiOkResponse({
    description: 'Ok',
    type: Company,
    isArray: true,
    example: [companyExample],
  })
  findWithTransfersLastMonth(): Promise<Company[]> {
    return this.companyService.findWithTransfersLastMonth();
  }
}
