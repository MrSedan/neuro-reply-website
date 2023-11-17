import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../db.entity';
import { userRep } from '../constants';
@Injectable()
export class UserService {
    constructor(
        @Inject(userRep)
        private photoRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.photoRepository.find();
    }
}
