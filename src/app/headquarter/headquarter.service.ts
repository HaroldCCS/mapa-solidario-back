import { Injectable } from '@nestjs/common';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';

import { Headquarter } from 'src/schemas/headquarter.schema';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class HeadquarterService {
  static cache_keys = {
    find_all: 'find-all-headquarters',
  }


  constructor(
    @InjectModel(Headquarter.name) private HeadquarterModel: Model<Headquarter>,
    private cacheService: CacheService
  ) { }

  async create(createHeadquarterDto: CreateHeadquarterDto) {
    const createHeadquarter = new this.HeadquarterModel(createHeadquarterDto);
    const save = await createHeadquarter.save();
    await this.cacheService.deleteCacheKey(HeadquarterService.cache_keys.find_all);
    return save;
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.HeadquarterModel.find(where).populate(populate).select(select).exec();
  }

  async findOne(_id: string) {
    const find = await this.HeadquarterModel.findById(_id).exec();
    return find;
  }

  async findOneByName(name: string) {
    const find = await this.HeadquarterModel.findOne({ name }).exec();
    if (!find) throw 'Headquarter not found';

    return find;
  }


  async update(_id: string, updateHeadquarterDto: UpdateHeadquarterDto) {
    const updated = await this.HeadquarterModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.HeadquarterModel.findOneAndUpdate({ _id }, { $set: updateHeadquarterDto }, { new: true });
    await this.cacheService.deleteCacheKey(HeadquarterService.cache_keys.find_all);
    return update
  }

  async remove(_id: string) {
    const headquarter = await this.HeadquarterModel.findById(_id).exec();
    if (!headquarter?._id) return { message: 'not found' };

    await this.HeadquarterModel.findByIdAndDelete(_id);
    await this.cacheService.deleteCacheKey(HeadquarterService.cache_keys.find_all);
    return { message: 'deleted' };
  }
}
