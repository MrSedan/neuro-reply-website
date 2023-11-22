import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'libs/database/admin.entity';
import { Post } from 'libs/database/post.entity';
import { EGetAll } from 'libs/enums/getAll.enum';
import { Repository } from 'typeorm';
import { ICreatePost, IEditPost } from './post.dto';

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
            return result;
        } catch (error) {
            this.logger.debug(`[post.newPost] error: ${JSON.stringify(error)}`);
            throw new HttpException('No user with this id', HttpStatus.BAD_REQUEST);
        }
    }

    async editPost(postId: string, data: IEditPost) {
        try {
            this.logger.log(`[post.editPost] data: ${JSON.stringify(data)}`);
            const post = await this.postRepository.findOne({ where: { uuid: postId } });
            if (!post) {
                throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            }
            if (post.text !== data.text) {
                post.text = data.text;
                post.timestamp = new Date();
                await this.postRepository.save(post);
            }
            return post;
        } catch (error) {
            this.logger.debug(`[post.editPost] error: ${JSON.stringify(error)}`);
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async getAllPosts(status: EGetAll) {
        try {
            let obj: object;
            switch (status) {
                case EGetAll.will_post:
                    obj = { where: { posted: false } };
                    break;
                case EGetAll.all:
                    obj = {};
                    break;
                case EGetAll.posted:
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
            const post = await this.postRepository.findOne({ where: { uuid: postId }, relations: { images: true } });
            if (!post) throw new Error("Can't find post");
            return post;
        } catch (error) {
            this.logger.log(`[post.getPost] error: ${JSON.stringify(error)}`);
            throw new HttpException('No post with this id', HttpStatus.NOT_FOUND);
        }
    }

    async getByMediaGroup(mediaGroupId: string) {
        try {
            this.logger.log(`[post.getByMediaGroup] data: ${mediaGroupId}`);
            const post = await this.postRepository.findOne({ where: { media_group_id: mediaGroupId } });
            if (!post) throw new Error("Can't find post");
            return post;
        } catch (error) {
            this.logger.debug(`[post.getByMediaGroup] error: ${JSON.stringify(error)}`);
            throw new HttpException("Can't find post with this media group id", HttpStatus.BAD_REQUEST);
        }
    }
}
