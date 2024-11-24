import { Module } from '@nestjs/common';
import { SurveyUserService } from './survey-user.service';
import { SurveyUserController } from './survey-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from '../services/cache/cache.service';
import { CacheModule } from '../services/cache/cache.module';
import { SurveyUser, SurveyUserSchema } from 'src/schemas/survey-user';

@Module({
  controllers: [SurveyUserController],
  imports: [MongooseModule.forFeature([{ name: SurveyUser.name, schema: SurveyUserSchema },]), CacheModule],
  providers: [SurveyUserService, CacheService],
  exports: [SurveyUserService, MongooseModule],
})
export class SurveyUserModule {}
