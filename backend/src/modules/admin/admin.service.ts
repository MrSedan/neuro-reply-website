import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'libs/database/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    private readonly logger: Logger = new Logger(AdminService.name);
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

    async getAdmins() {
        try {
            this.logger.debug(`[admin.getAdmins]`);
            const admins = await this.adminRepository.find({ relations: { user: true }, select: { user_id: true, user: { user_name: true } } });
            const result: { user_id: string; user_name: string }[] = admins.map((admin) => ({
                user_id: admin.user_id,
                user_name: admin.user.user_name,
            }));
            return result;
        } catch (error) {
            this.logger.log(`[getAdmin] ${JSON.stringify({ error })}`);
            return [];
        }
    }
    async checkIsAdmin(id: string) {
        try {
            this.logger.debug(`[admin.checkIsAdmin]`);
            const admins = await this.adminRepository.findOne({
                relations: { user: true },
                where: { user: { id: id } },
            });
            if (!admins) {
                return false;
            }
            return true;
        } catch (error) {
            this.logger.debug(`[checkIsAdmin] ${JSON.stringify({ error })}`);
            return false;
        }
    }
}
