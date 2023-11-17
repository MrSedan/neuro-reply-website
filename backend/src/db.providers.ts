import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 15432,
                username: 'postgres',
                password: 'postgres',
                database: 'bot_db',
                entities: ['db_models.ts'],
                logging: true,
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
