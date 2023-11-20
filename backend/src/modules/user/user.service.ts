import { Injectable, Logger } from '@nestjs/common';
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
            this.logger.log(`[user.getUser] ${JSON.stringify({ error })}`);
        }
    }
}
