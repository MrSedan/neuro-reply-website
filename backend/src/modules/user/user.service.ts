import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/database/user.entity';
import { Repository } from 'typeorm';
import { IGetUser } from './user.dto';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getUser(data: IGetUser) {
        try {
            this.logger.debug(`[user.getUser] data: ${JSON.stringify(data)}`);
            let user = await this.userRepository.findOne({
                where: { id: data.id },
            });
            if (!user) {
                user = await this.userRepository.save({ id: data.id, user_name: data.username });
                this.logger.log(`User ${data.id} created`);
            }
            return user;
        } catch (error) {
            this.logger.debug(`[user.getUser] ${JSON.stringify({ error })}`);
        }
    }
    async banUser(id: string) {
        try {
            this.logger.debug(`[user.banUser] id: ${JSON.stringify(id)}`);
            let user = await this.userRepository.findOne({
                where: { id: id },
            });
            if (user) {
                user.banned = true;
                await this.userRepository.save(user);
                return user;
            }

            user = await this.userRepository.save({ id: id, banned: true });
            return user;
        } catch (error) {
            this.logger.debug(`[user.banUser] ${JSON.stringify({ error })}`);
        }
    }

    async unBanUser(id: string) {
        try {
            this.logger.debug(`[user.unBanUser] id: ${JSON.stringify(id)}`);
            let user = await this.userRepository.findOne({
                where: { id: id },
            });
            if (!user) {
                throw new HttpException('No user with this id', HttpStatus.NOT_FOUND);
            }
            user = await this.userRepository.save({ id: user.id, banned: false });
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                this.logger.debug(`[user.unBanUser] User with id: ${id} not found`);
                throw error;
            }
            this.logger.debug(`[user.deBanUser] ${JSON.stringify({ error })}`);

    async getBannedUsers() {
        try {
            this.logger.log('[user.getBannedUsers]');
            return await this.userRepository.find({ where: { banned: true }, select: { id: true, user_name: true } });
        } catch (error) {
            this.logger.debug(`[user.getBannedUsers] ${error}`);
            throw new HttpException('Error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
