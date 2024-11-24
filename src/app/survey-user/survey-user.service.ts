import { Injectable } from '@nestjs/common';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '../services/cache/cache.service';
import { Model, PopulateOptions } from 'mongoose';
import { SurveyUser } from '../../schemas/survey-user';
import { SurveyPropertieService } from '../survey-propertie/survey-propertie.service';

@Injectable()
export class SurveyUserService {
  static cache_keys = {
    find_all: 'find-all-survey-user',
  }

  constructor(
    @InjectModel(SurveyUser.name) private SurveyUserModel: Model<SurveyUser>,
    private cacheService: CacheService,
    private surveyPropertieService: SurveyPropertieService,
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

  async saveMany(data: { user_id: string, surveys: CreateSurveyUserDto[] }) {
    const surveys = await this.SurveyUserModel.find({ user: data.user_id }).exec();

    const create_many: any[] = [];
    const updates: any[] = [];
    for (const survey of data.surveys) {
      const find = surveys.find(survey => survey.propertie?.toString() === survey.propertie?.toString());
      if (find) {
        updates.push(this.SurveyUserModel.findOneAndUpdate({ _id: find?._id }, { $set: survey }, { new: true }));
      } else {
        const update_data = { user: data.user_id, propertie: survey.propertie, value: survey.value };
        create_many.push(new this.SurveyUserModel(update_data));
      }
    }

    if (create_many.length > 0) await this.SurveyUserModel.insertMany(create_many);
    if (updates.length > 0) await Promise.all(updates);

    return true;
  }
}