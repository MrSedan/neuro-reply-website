import { config as configInit } from 'dotenv';

configInit({ path: '../.env' });

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
    redis: {
        redis_host: process.env.REDIS_HOST || 'localhost',
        redis_port: +process.env.REDIS_PORT || 6379,
        redis_password: process.env.REDIS_PASSWORD || '',
        redis_database: +process.env.REDIS_DB || 0,
    },
    server: {
        port: +process.env.SERVER_PORT || 8080,
        access_token: process.env.ACCESS_TOKEN || '',
    },
};
