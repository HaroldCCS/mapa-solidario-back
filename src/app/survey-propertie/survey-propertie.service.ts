import { Injectable } from '@nestjs/common';
import { CreateSurveyPropertieDto } from './dto/create-survey-propertie.dto';
import { UpdateSurveyPropertieDto } from './dto/update-survey-propertie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SurveyPropertie } from 'src/schemas/survey-propertie.schema';
import { CacheService } from '../services/cache/cache.service';
import { Model, PopulateOptions } from 'mongoose';

@Injectable()
export class SurveyPropertieService {
  static cache_keys = {
    find_all: 'find-all-survey-propertie',
  }

  constructor(
    @InjectModel(SurveyPropertie.name) private SurveyPropertieModel: Model<SurveyPropertie>,
    private cacheService: CacheService
  ) { }

  async create(createSurveyPropertieDto: CreateSurveyPropertieDto) {
    const createNotification = new this.SurveyPropertieModel(createSurveyPropertieDto);
    const save = await createNotification.save();
    await this.cacheService.deleteCacheKey(SurveyPropertieService.cache_keys.find_all);
    return save;
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.SurveyPropertieModel.find(where).populate(populate).select(select).exec();
  }

  async findOne(_id: string) {
    const find = await this.SurveyPropertieModel.findById(_id).exec();
    return find;
  }

  async update(_id: string, updateSurveyPropertieDto: UpdateSurveyPropertieDto) {
      const updated = await this.SurveyPropertieModel.findById(_id).exec();
      if (!updated?._id) return 'not found';
  
      const update = await this.SurveyPropertieModel.findOneAndUpdate({ _id }, { $set: updateSurveyPropertieDto }, { new: true });
      await this.cacheService.deleteCacheKey(SurveyPropertieService.cache_keys.find_all);
      return update
    }

  async remove(_id: string) {
    const surveyPropertie = await this.SurveyPropertieModel.findById(_id).exec();
    if (!surveyPropertie?._id) return { message: 'not found' };

    await this.SurveyPropertieModel.findByIdAndDelete(_id);
    await this.cacheService.deleteCacheKey(SurveyPropertieService.cache_keys.find_all);

    return { message: 'deleted'}
  }
}
