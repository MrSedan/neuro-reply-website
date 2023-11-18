import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'libs/database/admin.entity';

@Injectable()
export class AdminService {
    private readonly logger: Logger = new Logger(AdminService.name);
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

    async getAdmins() {
        try {
            this.logger.debug(`[admin.getAdmins]`);
            let admins = await this.adminRepository.find();
            return admins;
        } catch (error) {
            this.logger.log(`[getAdmin] ${JSON.stringify({ error })}`);
        }
    }
    async checkIsAdmin(id: string) {
        try {
            this.logger.debug(`[admin.checkIsAdmin]`);
            let admins = await this.adminRepository.findOne({
                where: { id: id },
            });
            if (!admins) {
                return false
            }
            return true;
        } catch (error) {
            this.logger.log(`[checkIsAdmin] ${JSON.stringify({ error })}`);
        }
    }
}
