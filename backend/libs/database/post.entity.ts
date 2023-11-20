import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToOne, JoinColumn } from 'typeorm';
import { Admin } from './admin.entity';
@Entity()
export class Post {
    constructor(props?: Partial<Post>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ default: false })
    posted: boolean;

    @Column({ nullable: false })
    from_user_id: string;
    @Column()
    text: string;
    @Column()
    media_group_id: string;
    @Column({ type: 'timestamptz' })
    timestamps: Date;

    @OneToOne(() => Admin)
    @JoinColumn({ name: 'from_user_id' })
    user: Admin;
}
