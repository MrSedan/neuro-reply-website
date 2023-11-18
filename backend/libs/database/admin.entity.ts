import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
    constructor(props?: Partial<Admin>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    public id!: string;

}
