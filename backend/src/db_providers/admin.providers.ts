import { DataSource } from 'typeorm';
import { Admin } from '../db.entity';
import { adminRep, dataSource } from '../constants';

export const adminProviders = [
    {
        provide: adminRep,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
        inject: [dataSource],
    },
];
