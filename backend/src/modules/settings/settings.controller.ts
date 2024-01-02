import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ICreateBotSettingsProfile, IEditBotSettingsProfile } from './settings.dto';
import { SettingsService } from './settings.service';

// Если нужна будет авторизация, для выключения авторизации на конкретном
// const AllowUnathorizedRequest = () => SetMetadata('allowUnathorizedRequest', true);
@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    @ApiOperation({ description: 'Get settings for bot' })
    @Get()
    async getSettings() {
        return await this.settingsService.getSettings();
    }

    @ApiOperation({ description: 'Get all bot settings profiles' })
    @Get('profile')
    async getProfiles() {
        return await this.settingsService.getProfiles();
    }

    @ApiOperation({ description: 'Create new settings profile' })
    @Post('profile/new')
    async newProfile(@Body() data: ICreateBotSettingsProfile) {
        return await this.settingsService.newProfile(data);
    }

    @ApiOperation({ description: 'Edit settings profile' })
    @Post('profile/edit')
    async editProfile(@Body() data: IEditBotSettingsProfile) {
        return await this.settingsService.editProfile(data);
    }

    @ApiOperation({ description: 'Delete settings profile' })
    @Delete('profile/delete/:uuid')
    async deleteProfile(@Param('uuid') uuid: string) {
        return await this.settingsService.deleteProfile(uuid);
    }
}
