import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'libs/database/image.entity';
import { Post } from 'libs/database/post.entity';
import { Repository } from 'typeorm';
import { IAddImage } from './image.dto';
@Injectable()
export class ImageService {
    private readonly logger: Logger = new Logger(ImageService.name);
    constructor(
        @InjectRepository(Image) private imageRepository: Repository<Image>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}

    async add(data: IAddImage) {
        try {
            this.logger.log(`[image.add] data: ${JSON.stringify(data)}`);
            const post = await this.postRepository.findOne({ where: { uuid: data.post_id } });
            await this.imageRepository.save({ post: post, file_id: data.file_id, has_spoiler: data.has_spoiler, message_id: data.message_id });
            return { status: 'ok' };
        } catch (error) {
            this.logger.debug(`[image.add] error: ${JSON.stringify(error)}`);
            throw new HttpException('No posts', HttpStatus.BAD_REQUEST);
        }
    }
}
