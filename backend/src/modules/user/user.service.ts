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
     async banUser(id: string){
        try {
            this.logger.debug(`[user.banUser] id: ${JSON.stringify(id)}`);
            let user = await this.userRepository.findOne({
                where: { id: id },
            });
            if(user){
                user.banned = true;
                await this.userRepository.save(user);
                return user;
            }
            
            user = await this.userRepository.save({ id: id, banned: true  });
            return user;
        } catch (error) {
            this.logger.log(`[user.banUser] ${JSON.stringify({ error })}`);
        }
     }

     async deBanUser(id: string){
        try {
            this.logger.debug(`[user.deBanUser] id: ${JSON.stringify(id)}`);
            let user = await this.userRepository.findOne({
                where: { id: id },
            });
            if(user){
                user.banned = false;
                await this.userRepository.save(user);
                return user;
            }
            
            user = await this.userRepository.save({ id: id, banned: false  });
            return user;
        } catch (error) {
            this.logger.log(`[user.deBanUser] ${JSON.stringify({ error })}`);
        }
     }
}
