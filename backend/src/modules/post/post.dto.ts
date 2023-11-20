import { ApiProperty } from '@nestjs/swagger';

export class ICreatePost {
    @ApiProperty({ description: 'Post text', example: 'Post text' }) readonly text!: string;

    @ApiProperty({ description: 'An id of user that creating post', example: '1234' }) readonly from_user_id!: string;

    @ApiProperty({ description: 'Post media group id', example: '123' }) readonly media_group_id?: string;
}
