import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BotSettings {
    constructor(props?: Partial<BotSettings>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    public uuid!: string;

    @Column({ type: 'text', array: true })
    public messageTimes!: string[];

    @Column()
    public channel!: string;

    @Column({ default: false })
    public isActive!: boolean;
}
