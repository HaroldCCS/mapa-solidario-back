import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { CacheModule as cache } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

const is_local = false;
const credentials = is_local ? {
  host: 'localhost',
  port: 6379,
} : {
  password: 'N7NtuyEHbcxNuu6UOHFai2ztqsm0x4Uh',
  host: 'redis-14935.c279.us-central1-1.gce.redns.redis-cloud.com:14935',
  port: 18936,
}

@Module({
  imports: [
    cache.register({
      max: 100,
      ttl: 0,
      isGlobal: true,
      // store: redisStore,
      // ...credentials
    })
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
