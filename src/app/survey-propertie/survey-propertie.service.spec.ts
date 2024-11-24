import { Test, TestingModule } from '@nestjs/testing';
import { SurveyPropertieService } from './survey-propertie.service';

describe('SurveyPropertieService', () => {
  let service: SurveyPropertieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyPropertieService],
    }).compile();

    service = module.get<SurveyPropertieService>(SurveyPropertieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
