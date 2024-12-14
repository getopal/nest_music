import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Track {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' }) // Using TEXT for potentially large text content
    text: string;

    @Column()
    cover: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column()
    artist: string;
}