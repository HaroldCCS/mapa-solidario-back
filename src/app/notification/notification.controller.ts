import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Post('/get-all-by-where')
  findAllByWhere(@Body() data: any) {
    return this.notificationService.findAll(data);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.notificationService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(_id, updateNotificationDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.notificationService.remove(_id);
  }
}
