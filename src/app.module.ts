import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user/entities/user.entity";
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
      UserModule,
      ArtistModule,
      AuthModule,
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: "postgres",
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: true,
          autoLoadEntities: true,
          entities: [UserEntity]
        }),
        inject: [ConfigService],
      }),
      TracksModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
