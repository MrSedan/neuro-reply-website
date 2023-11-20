import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ICreatePost } from './post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @ApiOperation({ description: 'Creates a new post' })
    @Post('new')
    async newPost(@Body() data: ICreatePost) {
        return await this.postService.newPost(data);
    }

    @ApiOperation({ description: 'Getting all posts' })
    @Get('get-all')
    async getAllPosts() {
        return await this.postService.getAllPosts();
    }

    @ApiOperation({ description: 'Getting a post bu uuid' })
    @Get('get/:postId')
    async getPost(@Param('postId') postId: string) {
        return await this.postService.getPost(postId);
    }
}
