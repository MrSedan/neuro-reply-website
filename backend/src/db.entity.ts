import { v4 as UUID } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;
}

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

@Entity()
export class Post {
    @PrimaryColumn('uuid')
    uuid: UUID;

    @Column()
    posted: boolean;

    @OneToOne(() => User)
    @JoinColumn()
    from_user: User;

    @Column()
    text: string;

    @Column()
    media_group_id: string;

    @Column('int', { array: true })
    images: number[];

    @CreateDateColumn()
    timestamp: Date;
}

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Post)
    @JoinColumn()
    post: Post;

    @Column()
    text: string;

    @Column()
    file_id: string;
}
