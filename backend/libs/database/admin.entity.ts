import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
    constructor(props?: Partial<Admin>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
