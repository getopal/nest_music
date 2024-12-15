import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiBody({ type: CreateTrackDto })
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    console.log(createTrackDto);
    return this.tracksService.create(createTrackDto);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number): Promise<Track[]> {
    return this.tracksService.findAllByUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Track> {
    return this.tracksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tracksService.remove(+id);
  }
}
