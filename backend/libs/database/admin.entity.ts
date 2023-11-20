import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
    constructor(props?: Partial<Admin>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: false })
    public user_id!: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    public user!: User;
}
