import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/entities')
  reportEntities() {
    return this.reportService.reportEntities();
  }

  @Get('/surveys')
  reportSurveys() {
    return this.reportService.reportSurveys();
  }

  @Get('/surveys-statistics')
  reportSurveysStatistics() {
    return this.reportService.reportSurveysStatistics();
  }

}
