import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    constructor(props?: Partial<User>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    public id!: string;

    @Column({ nullable: true })
    public user_name: string;
}
