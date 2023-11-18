import { OnModuleInit } from '@nestjs/common';
import { Admin } from 'libs/database/admin.entity';
import { User } from 'libs/database/user.entity';
import { Repository } from 'typeorm';
export declare class AppInitService implements OnModuleInit {
    private userRepository;
    private adminRepository;
    constructor(userRepository: Repository<User>, adminRepository: Repository<Admin>);
    onModuleInit(): Promise<void>;
}
