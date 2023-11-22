import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Image } from './image.entity';
@Entity()
export class Post {
    constructor(props?: Partial<Post>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    public uuid!: string;

    @Column({ default: false })
    public posted!: boolean;

    @Column()
    public text: string;

    @Column({ nullable: true })
    public media_group_id: string;

    @Column({ type: 'timestamptz' })
    public timestamp!: Date;

    @Column({ nullable: false })
    public from_user_id!: string;

    @ManyToOne(() => Admin, (admin) => admin.user.id)
    @JoinColumn({ name: 'from_user_id', referencedColumnName: 'user_id' })
    public from_user!: Admin;

    @OneToMany(() => Image, (image) => image.post)
    public images: Image[];
}
