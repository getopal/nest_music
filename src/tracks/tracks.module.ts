import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService], //Export the service if needed by other modules
})
export class TracksModule {}