import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyUserService } from './survey-user.service';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';

@Controller('survey-user')
export class SurveyUserController {
  constructor(private readonly surveyUserService: SurveyUserService) {}

  @Post()
  create(@Body() createSurveyUserDto: CreateSurveyUserDto) {
    return this.surveyUserService.create(createSurveyUserDto);
  }

  @Get()
  findAll() {
    return this.surveyUserService.findAll();
  }

  @Post('/get-all-by-where')
  findAllByWhere(@Body() data: any) {
    return this.surveyUserService.findAll(data);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.surveyUserService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateSurveyUserDto: UpdateSurveyUserDto) {
    return this.surveyUserService.update(_id, updateSurveyUserDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.surveyUserService.remove(_id);
  }


  @Post('/save-many/:_id')
  saveMany(@Param('_id') _id: string, @Body() data: CreateSurveyUserDto[]) {
    return this.surveyUserService.saveMany({surveys: data, user_id: _id});
  }
}
