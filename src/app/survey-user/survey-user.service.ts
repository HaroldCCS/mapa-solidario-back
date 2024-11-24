import { Injectable } from '@nestjs/common';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '../services/cache/cache.service';
import { Model, PopulateOptions } from 'mongoose';
import { SurveyUser } from '../../schemas/survey-user';

@Injectable()
export class SurveyUserService {
  static cache_keys = {
    find_all: 'find-all-survey-user',
  }

  constructor(
    @InjectModel(SurveyUser.name) private SurveyUserModel: Model<SurveyUser>,
    private cacheService: CacheService
  ) { }

  async create(createSurveyUserDto: CreateSurveyUserDto) {
    const createNotification = new this.SurveyUserModel(createSurveyUserDto);
    const save = await createNotification.save();
    await this.cacheService.deleteCacheKey(SurveyUserService.cache_keys.find_all);
    return save;
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.SurveyUserModel.find(where).populate(populate).select(select).exec();
  }

  async findOne(_id: string) {
    const find = await this.SurveyUserModel.findById(_id).exec();
    return find;
  }

  async update(_id: string, updateSurveyUserDto: UpdateSurveyUserDto) {
      const updated = await this.SurveyUserModel.findById(_id).exec();
      if (!updated?._id) return 'not found';
  
      const update = await this.SurveyUserModel.findOneAndUpdate({ _id }, { $set: updateSurveyUserDto }, { new: true });
      await this.cacheService.deleteCacheKey(SurveyUserService.cache_keys.find_all);
      return update
    }

  remove(_id: string) {
    return `This action removes a #${_id} surveyUser`;
  }
}
