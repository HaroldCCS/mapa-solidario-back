import { Module } from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { HeadquarterController } from './headquarter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Headquarter, HeadquarterSchema } from 'src/schemas/headquarter.schema';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';

@Module({
  controllers: [HeadquarterController],
  imports: [MongooseModule.forFeature([{ name: Headquarter.name, schema: HeadquarterSchema }]), CacheModule],
  providers: [HeadquarterService, CacheService],
})
export class HeadquarterModule {}
