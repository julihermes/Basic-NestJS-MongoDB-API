import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Autopopulate from 'mongoose-autopopulate';
import appConfig from './common/configs/app';
import databaseConfig from './common/configs/database';
import securityConfig from './common/configs/security';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, securityConfig, databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        connectionFactory: (connection) => {
          connection.plugin(Autopopulate);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
