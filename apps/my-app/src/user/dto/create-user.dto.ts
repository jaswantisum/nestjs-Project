import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  zipCode: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
