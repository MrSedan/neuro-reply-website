import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { BotSettings } from 'libs/database/settings.entity';
import { Repository } from 'typeorm';
import { ICreateBotSettingsProfile, IEditBotSettingsProfile } from './settings.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(BotSettings) private botSettingsRepository: Repository<BotSettings>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}
    private readonly logger: Logger = new Logger(SettingsService.name);

    async getSettings() {
        this.logger.debug('[settings.getSettings]');
        const settings = await this.botSettingsRepository.findOneBy({ isActive: true });
        if (settings) return settings;
        this.logger.debug(`[settings.getSettings] No active settings found`);
        throw new HttpException('No settings found', 404);
    }

    async getActiveSettings() {
        this.logger.debug('[settings.getActiveSettings]');
        const settings = await this.botSettingsRepository.findOneBy({ isActive: true });
        await this.cacheManager.set('settings', settings, { ttl: 600 } as any);
        if (settings) return settings;
        this.logger.debug(`[settings.getActiveSettings] No active settings found`);
        throw new HttpException('No settings found', 404);
    }

    async newProfile(data: ICreateBotSettingsProfile) {
        this.logger.log(`[settings.newProfile] data: ${JSON.stringify(data)}`);
        await this.cacheManager.del('settings');
        return await this.botSettingsRepository.save({ channel: data.channel, messageTimes: data.postTimes });
    }

    async getProfiles() {
        this.logger.log(`[settings.getProfiles]`);
        return await this.botSettingsRepository.find();
    }

    async editProfile(data: IEditBotSettingsProfile) {
        this.logger.log(`[settings.editProfile] data: ${JSON.stringify(data)}`);
        await this.cacheManager.del('settings');
        const editProfile = await this.botSettingsRepository.findOneBy({ uuid: data.uuid });
        if (!editProfile) {
            this.logger.debug(`[settings.editProfile] No profile found`);
            throw new HttpException('No profile found', 404);
        }
        data.channel ? (editProfile.channel = data.channel) : '';
        data.postTimes ? (editProfile.messageTimes = data.postTimes) : '';
        if (data.isActive !== undefined) {
            editProfile.isActive = data.isActive;
            if (data.isActive) {
                const nowActive = await this.botSettingsRepository.findOneBy({ isActive: true });
                if (nowActive) {
                    nowActive.isActive = false;
                    await this.botSettingsRepository.save(nowActive);
                }
            }
        }
        return await this.botSettingsRepository.save(editProfile);
    }

    async deleteProfile(profile_uuid: string) {
        this.logger.log(`[settings.deleteProfile] uuid: ${profile_uuid}`);
        await this.cacheManager.del('settings');
        const deleteProfile = await this.botSettingsRepository.findOneBy({ uuid: profile_uuid });
        if (!deleteProfile) {
            this.logger.debug(`[settings.deleteProfile] No profile found`);
            throw new HttpException('No profile found', 404);
        }
        if (deleteProfile.isActive) {
            this.logger.debug(`[settings.deleteProfile] Can't delete active profile`);
            throw new HttpException("Can't delete active profile", 400);
        }
        return await this.botSettingsRepository.delete(deleteProfile.uuid);
    }
}
