import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Admin } from 'libs/database/admin.entity';
import { Image } from 'libs/database/image.entity';
import { Post } from 'libs/database/post.entity';
import { DataSource, EntityManager } from 'typeorm';
import { IAddImage } from './image.dto';
@Injectable()
export class ImageService {
    private readonly logger: Logger = new Logger(ImageService.name);
    constructor(private dataSource: DataSource) {}

    async add(data: IAddImage) {
        try {
            let created_new = false;
            await this.dataSource.transaction(async (manager: EntityManager) => {
                this.logger.log(`[image.add] data: ${JSON.stringify(data)}`);
                if (data.media_group_id) {
                    let post = await manager.findOne(Post, { where: { media_group_id: data.media_group_id } });
                    if (post) {
                        await manager.save(Image, {
                            post: post,
                            file_id: data.file_id,
                            has_spoiler: data.has_spoiler,
                            message_id: data.message_id,
                        });
                        if (data.post_text) {
                            post.text = data.post_text;
                            post.message_entities = data.message_entities;
                            post = await manager.save(Post, post);
                        }
                    } else {
                        const user = await manager.findOne(Admin, { where: { user: { id: data.from_user_id } }, relations: { user: true } });
                        post = await manager.save(Post, {
                            media_group_id: data.media_group_id,
                            text: data.post_text,
                            message_entities: data.message_entities,
                            timestamp: new Date(),
                            from_user: user,
                        });
                        created_new = true;
                        await manager.save(Image, {
                            post: post,
                            file_id: data.file_id,
                            has_spoiler: data.has_spoiler,
                            message_id: data.message_id,
                        });
                    }
                } else {
                    const user = await manager.findOne(Admin, { where: { user: { id: data.from_user_id } }, relations: { user: true } });
                    const post = await manager.save(Post, {
                        text: data.post_text,
                        message_entities: data.message_entities,
                        timestamp: new Date(),
                        from_user: user,
                    });
                    await manager.save(Image, {
                        post: post,
                        file_id: data.file_id,
                        has_spoiler: data.has_spoiler,
                        message_id: data.message_id,
                    });
                }
            });
            return { status: 'ok', created: created_new };
        } catch (error) {
            this.logger.debug(`[image.add] error: ${JSON.stringify(error)}`);
            throw new HttpException('No posts', HttpStatus.BAD_REQUEST);
        }
    }
}
