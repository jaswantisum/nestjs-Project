import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

class Address {
  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  zipCode: number;
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
