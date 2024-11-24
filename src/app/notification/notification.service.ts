import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, CreateManyNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';

import { Notification } from 'src/schemas/notification.schema';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class NotificationService {
  static cache_keys = {
    find_all: 'find-all-notifications',
  }


  constructor(
    @InjectModel(Notification.name) private NotificationModel: Model<Notification>,
    private cacheService: CacheService
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    const createNotification = new this.NotificationModel(createNotificationDto);
    const save = await createNotification.save();
    await this.cacheService.deleteCacheKey(NotificationService.cache_keys.find_all);
    return save;
  }

  async createMany(createMany: CreateManyNotificationDto) {
    const notifications_bulk: any[] = createMany?.users?.map(user => new this.NotificationModel({
      user,
      name: createMany?.name,
      description: createMany?.description,
    }))

    const save = await this.NotificationModel.insertMany(notifications_bulk);
    await this.cacheService.deleteCacheKey(NotificationService.cache_keys.find_all);

    return {success: true, message: 'Notifications created'};
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.NotificationModel.find(where).populate(populate).select(select).exec();
  }


  async findOne(_id: string) {
    const find = await this.NotificationModel.findById(_id).exec();
    return find;
  }

  async findOneByName(name: string) {
    const find = await this.NotificationModel.findOne({ name }).exec();
    if (!find) throw 'Notification not found';

    return find;
  }


  async update(_id: string, updateNotificationDto: UpdateNotificationDto) {
    const updated = await this.NotificationModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.NotificationModel.findOneAndUpdate({ _id }, { $set: updateNotificationDto }, { new: true });
    await this.cacheService.deleteCacheKey(NotificationService.cache_keys.find_all);
    return update
  }

  remove(_id: string) {
    return `This action removes a #${_id} Notification`;
  }
}
