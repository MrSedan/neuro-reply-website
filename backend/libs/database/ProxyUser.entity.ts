import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ProxyUser {
    constructor(props?: Partial<ProxyUser>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ nullable: true })
    public userName: string;

    @Column({ nullable: true })
    public description: string;

    @Column({ nullable: false })
    public link!: string;

    @Column({ nullable: false, type: 'timestamptz' })
    public connectDate!: Date;

    @Column({ nullable: true })
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
