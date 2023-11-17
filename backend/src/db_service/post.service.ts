import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../db.entity';
import { postRep } from '../constants';
@Injectable()
export class PostService {
    constructor(
        @Inject(postRep)
        private photoRepository: Repository<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.photoRepository.find();
    }
}
