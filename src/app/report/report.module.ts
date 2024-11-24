import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { SurveyUserModule } from '../survey-user/survey-user.module';
import { SurveyPropertieModule } from '../survey-propertie/survey-propertie.module';
import { SurveyPropertieService } from '../survey-propertie/survey-propertie.service';
import { SurveyUserService } from '../survey-user/survey-user.service';
import { RolModule } from '../rol/rol.module';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [ReportController],
  imports: [UsersModule, SurveyUserModule, SurveyPropertieModule, RolModule, CacheModule, NotificationModule],
  providers: [ReportService, UsersService, SurveyUserService, SurveyPropertieService, CacheService, NotificationService],
})
export class ReportModule {}
