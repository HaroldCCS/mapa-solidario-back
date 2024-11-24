import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyUserDto } from './create-survey-user.dto';

export class UpdateSurveyUserDto extends PartialType(CreateSurveyUserDto) {}
