import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { EGetAll } from 'libs/enums/getAll.enum';
import { ICreatePost, IEditPost } from './post.dto';
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

    @ApiOperation({ description: 'Getting all posts. By default - all' })
    @Get('get-all/:status')
    @ApiParam({ name: 'status', required: false, enum: EGetAll })
    async getAllPosts(@Param('status') status?: EGetAll) {
        return await this.postService.getAllPosts(status || EGetAll.all);
    }

    @ApiOperation({ description: 'Getting a post by uuid' })
    @Get('get/:postId')
    async getPost(@Param('postId') postId: string) {
        return await this.postService.getPost(postId);
    }

    @ApiOperation({ description: 'Getting a post by its media group id' })
    @Get('get-by-media-group-id/:mediaGroupId')
    async getByMediaGroup(@Param('mediaGroupId') mediaGroupId: string) {
        return await this.postService.getByMediaGroup(mediaGroupId);
    }

    @ApiOperation({ description: 'Editing a post by its uuid' })
    @Post('edit/:postId')
    async editPost(@Param('postId') postId: string, @Body() data: IEditPost) {
        return await this.postService.editPost(postId, data);
    }

    @ApiOperation({ description: 'Editing post text by its order num' })
    @Post('edit-post-by-order-num/:order')
    async editPostByOrderNum(@Param('order') order: string, @Body() data: IEditPost) {
        return await this.postService.editPostByOrderNum(order, data);
    }

    @ApiOperation({ description: 'Get post to post' })
    @Get('post')
    async post() {
        return await this.postService.post();
    }
}
