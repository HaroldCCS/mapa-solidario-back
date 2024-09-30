import { Module } from '@nestjs/common';
import { UsersModule } from './app/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './app/auth/auth.module';
import { PermissionModule } from './app/permission/permission.module';
import { RolModule } from './app/rol/rol.module';
import { CacheModule} from './app/services/cache/cache.module';
import { HeadquarterModule } from './app/headquarter/headquarter.module';
import { EventModule } from './app/event/event.module';
import { NotificationModule } from './app/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://blowbarber:blowbarberesunabarberia@google-serverless-us-ce.owdbrj9.mongodb.net/mapasolidario"),
    UsersModule,
    AuthModule,
    PermissionModule,
    RolModule,
    CacheModule,
    HeadquarterModule,
    EventModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
