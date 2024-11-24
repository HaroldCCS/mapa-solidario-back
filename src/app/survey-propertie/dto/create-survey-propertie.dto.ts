import { IsBoolean, IsString } from "class-validator";

export type TypeTypeForm = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';

export class CreateSurveyPropertieDto {

  @IsString()
  propertie: string;

  @IsString()
  type_form: TypeTypeForm;

  @IsBoolean()
  status: boolean;
}
