import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Title of the track' })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Text content of the track' })
    text: string;


    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({ description: 'URL of the track cover image' })
    cover: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Artist of the track' })
    artist: string;
}