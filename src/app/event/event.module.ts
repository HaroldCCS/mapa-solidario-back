import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/schemas/event.schema';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';

@Module({
  controllers: [EventController],
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), CacheModule],
  providers: [EventService, CacheService],
})
export class EventModule {}
