import { DataSource } from 'typeorm';
import { Post } from '../db.entity';
import { postRep, dataSource } from '../constants';

export const postProviders = [
    {
        provide: postRep,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
        inject: [dataSource],
    },
];
