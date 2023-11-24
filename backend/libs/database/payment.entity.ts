import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProxyUser } from './proxy_user.entity';

@Entity()
export class Payment {
    constructor(props?: Partial<Payment>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column()
    public user_uuid!: string;

    @Column({ type: 'timestamptz' })
    public payTime!: Date;

    @ManyToOne(() => ProxyUser, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: ProxyUser;
}
