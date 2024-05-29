import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  last_name: string;
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(12)
  @Matches(/^\+7\(?\d{10}\)?/g)
  @ApiProperty()
  phone: string;
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
