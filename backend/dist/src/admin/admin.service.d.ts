import { Repository } from 'typeorm';
import { Admin } from 'libs/database/admin.entity';
export declare class AdminService {
    private adminRepository;
    private readonly logger;
    constructor(adminRepository: Repository<Admin>);
    getAdmins(): Promise<Admin[]>;
    checkIsAdmin(id: string): Promise<boolean>;
}
