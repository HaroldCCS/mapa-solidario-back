import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';

@Module({
  controllers: [NotificationController],
  imports: [MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]), CacheModule],
  providers: [NotificationService, CacheService],
  exports: [NotificationService, MongooseModule]
})
export class NotificationModule {}
