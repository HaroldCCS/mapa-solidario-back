import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {

  @IsString()
  _id?: string;

  @IsString()
  user?: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  event?: string;

  @IsBoolean()
  read?: boolean;
}


export class CreateManyNotificationDto {
  @IsArray()
  users: string[];

  @IsString()
  name?: string;

  @IsString()
  description?: string;
}