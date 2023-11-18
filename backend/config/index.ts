import { config as configInit } from 'dotenv';

configInit();

export const config = {
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: +process.env.DATABASE_PORT || 5432,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_DB || 'bot_db',
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
    },
    server: {
        port: +process.env.SERVER_PORT || 8080,
    },
};
