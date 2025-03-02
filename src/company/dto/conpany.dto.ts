import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CompanyDto {
  @IsString({ message: 'companyName must be a string' })
  @IsNotEmpty({ message: 'companyName is required' })
  @MinLength(3, { message: 'companyName must be at least 3 characters long' })
  @ApiProperty({
    type: String,
    description:
      'This is a required property, and it must be at least 3 characters long',
  })
  companyName: string;
  @IsString({ message: 'cuit must be a string' })
  @IsNotEmpty({ message: 'cuit is required' })
  @Length(11, 11, { message: 'cuit must be 11 characters long' })
  @ApiProperty({
    type: String,
    description:
      'This is a required property, and it must be 11 characters long',
  })
  cuit: string;
}
