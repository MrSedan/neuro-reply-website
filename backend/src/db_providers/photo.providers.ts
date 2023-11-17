import { DataSource } from 'typeorm';
import { Photo } from '../db.entity';
import { photoRep, dataSource } from '../constants';

export const photoProviders = [
    {
        provide: photoRep,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
        inject: [dataSource],
    },
];
