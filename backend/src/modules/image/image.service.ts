import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'libs/database/admin.entity';
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
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}

    async add(data: IAddImage) {
        try {
            this.logger.log(`[image.add] data: ${JSON.stringify(data)}`);
            let created_new = false;
            if (data.media_group_id) {
                let post = await this.postRepository.findOne({ where: { media_group_id: data.media_group_id } });
                if (post) {
                    await this.imageRepository.save({
                        post: post,
                        file_id: data.file_id,
                        has_spoiler: data.has_spoiler,
                        message_id: data.message_id,
                    });
                    if (data.post_text) {
                        post.text = data.post_text;
                        post.message_entities = data.message_entities;
                        post = await this.postRepository.save(post);
                    }
                } else {
                    const user = await this.adminRepository.findOne({ where: { user: { id: data.from_user_id } }, relations: { user: true } });
                    post = await this.postRepository.save({
                        media_group_id: data.media_group_id,
                        text: data.post_text,
                        message_entities: data.message_entities,
                        timestamp: new Date(),
                        from_user: user,
                    });
                    created_new = true;
                    await this.imageRepository.save({
                        post: post,
                        file_id: data.file_id,
                        has_spoiler: data.has_spoiler,
                        message_id: data.message_id,
                    });
                    this.logger.log('Created post');
                }
            } else {
                const user = await this.adminRepository.findOne({ where: { user: { id: data.from_user_id } }, relations: { user: true } });
                const post = await this.postRepository.save({
                    text: data.post_text,
                    message_entities: data.message_entities,
                    timestamp: new Date(),
                    from_user: user,
                });
                await this.imageRepository.save({
                    post: post,
                    file_id: data.file_id,
                    has_spoiler: data.has_spoiler,
                    message_id: data.message_id,
                });
            }
            return { status: 'ok', created: created_new };
        } catch (error) {
            this.logger.debug(`[image.add] error: ${JSON.stringify(error)}`);
            throw new HttpException('No posts', HttpStatus.BAD_REQUEST);
        }
    }
}
