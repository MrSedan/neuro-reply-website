import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'config';
import { AppModule } from './app.module';
import { swagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'debug', 'error', 'warn', 'verbose'],
    });
    swagger(app);
    await app.listen(config.server.port, () => Logger.log(`Server started on port ${config.server.port}`));
}
bootstrap();
