import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(
      @InjectRepository(Track)
      private tracksRepository: Repository<Track>,
  ) {}


  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    console.log(createTrackDto)
    const track = this.tracksRepository.create(createTrackDto);
    return this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find({ where: { deletedAt: null } });
  }

  async findOne(id: number): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id, deletedAt: null });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async update(id: number, updateTrackDto: CreateTrackDto): Promise<Track> { //Using CreateTrackDto for simplicity, but a dedicated UpdateTrackDto would be better
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto); //Potentially unsafe in production, use specific fields instead
    return this.tracksRepository.save(track);
  }

  async remove(id: number): Promise<void> {
    const track = await this.findOne(id);
    await this.tracksRepository.softRemove(track);
  }
}