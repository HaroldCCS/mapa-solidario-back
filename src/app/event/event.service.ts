import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';

import { Event } from 'src/schemas/event.schema';
import { CacheService } from '../services/cache/cache.service';
5
@Injectable()
export class EventService {
  static cache_keys = {
    find_all: 'find-all-events',
  }


  constructor(
    @InjectModel(Event.name) private EventModel: Model<Event>,
    private cacheService: CacheService
  ) { }

  async create(createEventDto: CreateEventDto) {
    const createEvent = new this.EventModel(createEventDto);
    const save = await createEvent.save();
    await this.cacheService.deleteCacheKey(EventService.cache_keys.find_all);
    return save;
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.EventModel.find(where).populate(populate).select(select).exec();
  }

  async findOne(_id: string) {
    const find = await this.EventModel.findById(_id).exec();
    return find;
  }

  async findOneByName(name: string) {
    const find = await this.EventModel.findOne({ name }).exec();
    if (!find) throw 'Event not found';

    return find;
  }


  async update(_id: string, updateEventDto: UpdateEventDto) {
    const updated = await this.EventModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.EventModel.findOneAndUpdate({ _id }, { $set: updateEventDto }, { new: true });
    await this.cacheService.deleteCacheKey(EventService.cache_keys.find_all);
    return update
  }

  remove(_id: string) {
    return `This action removes a #${_id} Event`;
  }
}
