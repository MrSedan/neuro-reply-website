import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'libs/database/admin.entity';
import { Post } from 'libs/database/post.entity';
import { Repository } from 'typeorm';
import { ICreatePost } from './post.dto';

@Injectable()
export class PostService {
    private readonly logger: Logger = new Logger(PostService.name);
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}

    async newPost(data: ICreatePost) {
        try {
            this.logger.log(`[post.newPost] data: ${JSON.stringify(data)}`);
            const user = await this.adminRepository.findOne({ where: { user: { id: data.from_user_id } }, relations: { user: true } });
            const result = await this.postRepository.save({
                text: data.text,
                media_group_id: data.media_group_id,
                from_user: user,
                timestamp: new Date(),
            });
            this.logger.log(`Created new post: ${result.uuid}`);
            return { status: 'ok' };
        } catch (error) {
            this.logger.debug(`[post.newPost] error: ${JSON.stringify(error)}`);
            throw new HttpException('No user with this id', HttpStatus.BAD_REQUEST);
        }
    }

    async getAllPosts(status: 'will-post' | 'all' | 'posted') {
        try {
            let obj: object;
            switch (status) {
                case 'will-post':
                    obj = { where: { posted: false } };
                    break;
                case 'all':
                    obj = {};
                    break;
                case 'posted':
                    obj = { where: { posted: true } };
                    break;
            }
            return await this.postRepository.find(obj);
        } catch (error) {
            this.logger.log(`[post.getAllPosts] error: ${JSON.stringify(error)}`);
            return [];
        }
    }

    async getPost(postId: string) {
        try {
            this.logger.log(`[post.getPost] data: ${postId}`);
            return await this.postRepository.findOne({ where: { uuid: postId }, relations: { images: true } });
        } catch (error) {
            this.logger.log(`[post.getPost] error: ${JSON.stringify(error)}`);
            throw new HttpException('No post with this id', HttpStatus.NOT_FOUND);
        }
    }

    async getByMediaGroup(mediaGroupId: string) {
        try {
            this.logger.log(`[post.getByMediaGroup] data: ${mediaGroupId}`);
            return await this.postRepository.findOne({ where: { media_group_id: mediaGroupId } });
        } catch (error) {
            this.logger.debug(`[post.getByMediaGroup] error: ${JSON.stringify(error)}`);
            throw new HttpException("Can't find post with this media group id", HttpStatus.BAD_REQUEST);
        }
    }
}
