import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/schemas/event.schema';

import { NotificationModule } from '../notification/notification.module';
import { CacheModule } from '../services/cache/cache.module';
import { UsersModule } from '../users/users.module';

import { NotificationService } from '../notification/notification.service';
import { CacheService } from '../services/cache/cache.service';
import { UsersService } from '../users/users.service';
import { RolModule } from '../rol/rol.module';

@Module({
  controllers: [EventController],
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), CacheModule, UsersModule, NotificationModule, RolModule],
  providers: [EventService, CacheService, UsersService, NotificationService],
})
export class EventModule {}
