import { Module } from '@nestjs/common';
import { SurveyPropertieService } from './survey-propertie.service';
import { SurveyPropertieController } from './survey-propertie.controller';
import { SurveyPropertie, SurveyPropertieSchema } from 'src/schemas/survey-propertie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from '../services/cache/cache.service';
import { CacheModule } from '../services/cache/cache.module';

@Module({
  controllers: [SurveyPropertieController],
  imports: [MongooseModule.forFeature([{ name: SurveyPropertie.name, schema: SurveyPropertieSchema },]), CacheModule],
  providers: [SurveyPropertieService, CacheService],
  exports: [SurveyPropertieService, MongooseModule],
})
export class SurveyPropertieModule {}
