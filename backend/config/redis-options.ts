import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { config } from 'config';

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    useFactory: async () => {
        const store = await redisStore({
            socket: {
                host: config.redis.redis_host,
                port: config.redis.redis_port,
                passphrase: config.redis.redis_password,
            },
        });
        return {
            store: () => store,
        };
    },
};
