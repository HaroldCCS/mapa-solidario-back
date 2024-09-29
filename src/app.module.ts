import { Module } from '@nestjs/common';
import { UsersModule } from './app/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './app/auth/auth.module';
import { PermissionModule } from './app/permission/permission.module';
import { RolModule } from './app/rol/rol.module';
import { CacheModule} from './app/services/cache/cache.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://blowbarber:blowbarberesunabarberia@google-serverless-us-ce.owdbrj9.mongodb.net/mapasolidario"),
    UsersModule,
    AuthModule,
    PermissionModule,
    RolModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
