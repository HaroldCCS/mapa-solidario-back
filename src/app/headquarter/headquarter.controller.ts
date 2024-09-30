import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { CreateHeadquarterDto } from './dto/create-headquarter.dto';
import { UpdateHeadquarterDto } from './dto/update-headquarter.dto';

@Controller('headquarter')
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Post()
  create(@Body() createHeadquarterDto: CreateHeadquarterDto) {
    return this.headquarterService.create(createHeadquarterDto);
  }

  @Get()
  findAll() {
    return this.headquarterService.findAll();
  }

  @Post('/get-all-by-where')
  findAllByWhere(@Body() data: any) {
    return this.headquarterService.findAll(data);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.headquarterService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateHeadquarterDto: UpdateHeadquarterDto) {
    return this.headquarterService.update(_id, updateHeadquarterDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.headquarterService.remove(_id);
  }
}
