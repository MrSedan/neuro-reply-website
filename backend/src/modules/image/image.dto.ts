import { ApiProperty } from '@nestjs/swagger';

export class IAddImage {
    // @ApiProperty({ description: 'A post that contains this photo', example: '1212-4324-asdf-23432' }) readonly post_id!: string;
    @ApiProperty({ description: 'A telegram file id of photo', example: '1214244' }) readonly file_id!: string;
    @ApiProperty({ description: 'Has image the spoiler?', example: false }) readonly has_spoiler!: boolean;
    @ApiProperty({ description: 'A photo message id', example: '123124' }) readonly message_id!: number;
    @ApiProperty({ description: 'Post text', example: '#neurowaifu', required: false }) readonly post_text?: string;
    @ApiProperty({ description: 'A media group id of the photo', example: '1241244', required: false }) readonly media_group_id?: string;
    @ApiProperty({ description: 'Message entities of text', example: '[]' }) readonly message_entities?: string;
    @ApiProperty({ description: 'The id of user that creating post', example: '1234' }) readonly from_user_id!: string;
}
