import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyPropertieService } from './survey-propertie.service';
import { CreateSurveyPropertieDto } from './dto/create-survey-propertie.dto';
import { UpdateSurveyPropertieDto } from './dto/update-survey-propertie.dto';

@Controller('survey-propertie')
export class SurveyPropertieController {
  constructor(private readonly surveyPropertieService: SurveyPropertieService) {}

  @Post()
  create(@Body() createSurveyPropertieDto: CreateSurveyPropertieDto) {
    return this.surveyPropertieService.create(createSurveyPropertieDto);
  }

  @Get()
  findAll() {
    return this.surveyPropertieService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.surveyPropertieService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateSurveyPropertieDto: UpdateSurveyPropertieDto) {
    return this.surveyPropertieService.update(_id, updateSurveyPropertieDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.surveyPropertieService.remove(_id);
  }
}
