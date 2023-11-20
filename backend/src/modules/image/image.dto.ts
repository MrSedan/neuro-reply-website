import { ApiProperty } from '@nestjs/swagger';

export class IAddImage {
    @ApiProperty({ description: 'A post that contains this photo', example: '1212-4324-asdf-23432' }) readonly post_id!: string;
    @ApiProperty({ description: 'A telegram file id of photo', example: '1214244' }) readonly file_id!: string;
    @ApiProperty({ description: 'Has image the spoiler?', example: false }) readonly has_spoiler!: boolean;
    @ApiProperty({ description: 'A photo message id', example: '123124' }) readonly message_id!: number;
}
