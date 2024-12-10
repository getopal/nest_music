import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Track} from "../../tracks/entities/track.entity";

export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Track, (track) => track.artist)
    tracks: Track[];

}
