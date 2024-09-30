import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  //poner _id de mongoose
  @IsString()
  _id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password?: string;

  @IsString()
  name: string;

  @IsString()
  cell_phone: string;

  @IsNumber()
  incremental?: number;

  @IsString()
  nit?: string;

  @IsArray()
  rol?: string;

  @IsBoolean()
  status?: boolean;

  @IsString()
  user_validated?: 'pending' | 'approved' | 'rejected';

  @IsString()
  user_validated_reason?: string;
}