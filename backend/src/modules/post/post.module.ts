import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [LibsModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
