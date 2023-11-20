import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'libs/database/admin.entity';
import { User } from 'libs/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppInitService implements OnModuleInit {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}

    async onModuleInit() {}
}
