import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyPropertieDto } from './create-survey-propertie.dto';

export class UpdateSurveyPropertieDto extends PartialType(CreateSurveyPropertieDto) {}
