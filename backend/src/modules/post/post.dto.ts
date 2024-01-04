import { ApiProperty } from '@nestjs/swagger';

export class ICreatePost {
    @ApiProperty({ description: 'Post text', example: 'Post text' }) readonly text!: string;

    @ApiProperty({ description: 'The id of user that creating post', example: '1234' }) readonly from_user_id!: string;

    @ApiProperty({ description: 'Post media group id', example: '123' }) readonly media_group_id?: string;

    @ApiProperty({ description: 'Message entities of text', example: '[]' }) readonly message_entities?: string;
}

export class IEditPost {
    @ApiProperty({ description: 'Post text', example: 'Post text' }) readonly text!: string;
}
