import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProxyUser } from './ProxyUser.entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column()
    public uuidUser!: string;

    @Column({ type: 'timestamptz' })
    public payTime!: Date;

    @ManyToOne(() => ProxyUser, { onDelete: 'CASCADE' }) // Assuming you want to cascade delete when a user is deleted
    @JoinColumn({ name: 'uuidUser' })
    user: ProxyUser;

    constructor(props?: Partial<Payment>) {
        Object.assign(this, props);
    }
}
