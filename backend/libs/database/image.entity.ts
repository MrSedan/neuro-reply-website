import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Image {
    constructor(props?: Partial<Image>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    message_id: number;

    @Column({ nullable: false })
    post_id: number;

    @Column({ nullable: false })
    file_id: string;
    @Column({ default: false })
    has_spoiler: boolean;

    @OneToOne(() => Post)
    @JoinColumn({ name: 'post_id' })
    user: Post;
}
