"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
exports.db = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_DB || 'bot_db',
    synchronize: true,
    logging: false,
    entities: ['/libs/database/*.ts'],
    migrations: ['/libs/migrations/*.ts']
});
//# sourceMappingURL=datasource.js.map