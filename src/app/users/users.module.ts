import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { RolService } from '../rol/rol.service';
import { RolModule } from '../rol/rol.module';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), RolModule, CacheModule, NotificationModule],
  controllers: [UsersController],
  providers: [UsersService, CacheService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule { }
