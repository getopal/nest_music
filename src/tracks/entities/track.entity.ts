import {Column, DeleteDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Artist} from "../../artist/entities/artist.entity";

export class Track {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    text: string

    @Column()
    cover: string

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt?: Date

    @ManyToOne(type => Artist, (artist: Artist) => artist.name)
    artist: Artist;
}
