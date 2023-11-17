import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from '../db.entity';
import { photoRep } from '../constants';

@Injectable()
export class PhotoService {
    constructor(
        @Inject(photoRep)
        private photoRepository: Repository<Photo>,
    ) {}

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }
}
