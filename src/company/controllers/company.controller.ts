import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CompanyDto } from '../dto/conpany.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Company } from '../entities/company.entity';
import {
  swaggerPostCompanyBadRequestExample,
  swaggerPostCompanyConflictExample,
  swaggerPostCompanyExample,
} from 'src/common/swagger/responseExamples/company';

@Controller('/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Company })
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Company,
    isArray: false,
    example: swaggerPostCompanyExample,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: swaggerPostCompanyBadRequestExample,
  })
  @ApiConflictResponse({
    description: 'Company already exists',
    example: swaggerPostCompanyConflictExample,
  })
  create(@Body() companyDto: CompanyDto): Promise<Company> {
    return this.companyService.create(companyDto);
  }

  @Get('/recently-joined')
  findRecentlyJoined(): Promise<Company[]> {
    return this.companyService.findRecentlyJoined();
  }
}
