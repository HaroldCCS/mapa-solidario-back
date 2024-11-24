import { Test, TestingModule } from '@nestjs/testing';
import { SurveyPropertieController } from './survey-propertie.controller';
import { SurveyPropertieService } from './survey-propertie.service';

describe('SurveyPropertieController', () => {
  let controller: SurveyPropertieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyPropertieController],
      providers: [SurveyPropertieService],
    }).compile();

    controller = module.get<SurveyPropertieController>(SurveyPropertieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
