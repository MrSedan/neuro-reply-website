import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Image {
    constructor(props?: Partial<Image>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    public message_id!: number;

    @Column({ nullable: false })
    public file_id!: string;

    @Column({ default: false })
    public has_spoiler!: boolean;

    @Column({ nullable: false })
    public post_uuid!: string;

    @ManyToOne(() => Post, (post) => post.uuid, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_uuid' })
    public post!: Post;
}
