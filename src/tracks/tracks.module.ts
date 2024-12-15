import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, UserEntity])],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
