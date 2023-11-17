import { DataSource } from 'typeorm';
import { User } from '../db.entity';
import { userRep, dataSource } from '../constants';

export const userProviders = [
    {
        provide: userRep,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [dataSource],
    },
];
