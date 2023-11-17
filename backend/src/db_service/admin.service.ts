import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from '../db.entity';
import { adminRep } from '../constants';
@Injectable()
export class AdminService {
    constructor(
        @Inject(adminRep)
        private photoRepository: Repository<Admin>,
    ) {}

    async findAll(): Promise<Admin[]> {
        return this.photoRepository.find();
    }
}
