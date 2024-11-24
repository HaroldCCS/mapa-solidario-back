import { IsString } from "class-validator";

export type TypeTypeForm = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';

export class CreateSurveyUserDto {

  @IsString()
  user: string;

  @IsString()
  propertie: string;

  value: any;
}
