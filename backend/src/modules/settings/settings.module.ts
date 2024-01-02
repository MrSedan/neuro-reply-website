import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
    imports: [LibsModule],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {}
