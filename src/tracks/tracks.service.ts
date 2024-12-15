import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const user = await this.userRepository.findOneBy({
      id: createTrackDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTrackDto.userId} not found`,
      );
    }

    const track = this.tracksRepository.create({ ...createTrackDto, user });
    return this.tracksRepository.save(track);
  }

  async findAllByUser(userId: number): Promise<Track[]> {
    return this.tracksRepository.find({
      where: { userId, deletedAt: null },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Track> {
    const track = await this.tracksRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['user'],
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async update(id: number, updateTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    const user = await this.userRepository.findOneBy({
      id: updateTrackDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${updateTrackDto.userId} not found`,
      );
    }
    Object.assign(track, updateTrackDto, { user });
    return this.tracksRepository.save(track);
  }

  async remove(id: number): Promise<void> {
    const track = await this.findOne(id);
    await this.tracksRepository.softRemove(track);
  }
}
