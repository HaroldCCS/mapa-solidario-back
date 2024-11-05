import { IsArray, IsBoolean, IsDate, IsString } from "class-validator";

export class CreateEventDto {

  @IsString()
  _id?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  ubication: string;

  @IsDate()
  day: Date;

  @IsArray()
  location: number[];

  @IsString()
  user_creator: string;
}
