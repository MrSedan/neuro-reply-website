import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ProxyUser {
    constructor(props?: Partial<ProxyUser>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    public uuid!: string;

    @Column({ nullable: true })
    public userName: string;

    @Column({ nullable: true })
    public description: string;

    @Column({ nullable: false })
    public link!: string;

    @Column({ nullable: false, type: 'timestamptz' })
    public connectDate!: Date;

    @Column({ nullable: true })
    public user_id!: string;

    @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'user_id' })
    public user: User;
}
