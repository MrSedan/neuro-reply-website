import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
    imports: [LibsModule],
    controllers: [ProxyController],
    providers: [ProxyService],
})
export class ProxyModule {}
