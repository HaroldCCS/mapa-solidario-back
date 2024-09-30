import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Post('/get-all-by-where')
  findAllByWhere(@Body() data: any) {
    return this.eventService.findAll(data);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.eventService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(_id, updateEventDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.eventService.remove(_id);
  }
}
