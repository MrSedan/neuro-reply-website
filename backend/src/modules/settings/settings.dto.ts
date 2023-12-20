import { ApiProperty } from '@nestjs/swagger';

export class ICreateBotSettingsProfile {
    @ApiProperty({ description: 'Channel', example: '@neurowoman_test' }) readonly channel: string;
    @ApiProperty({ description: 'Post times', example: ['12:00', '14:00'] }) readonly postTimes: string[];
}

export class IEditBotSettingsProfile {
    @ApiProperty({ description: 'Channel', example: '@neurowoman_test' }) readonly channel: string | undefined;
    @ApiProperty({ description: 'Profile uuid', example: '96e7d1b3-20ca-46e8-ac68-e406f79b7eb9' }) readonly uuid: string;
    @ApiProperty({ description: 'Post times', example: ['12:00', '14:00'] }) readonly postTimes: string[] | undefined;
    @ApiProperty({ description: 'Is active?', example: false }) readonly isActive: boolean | undefined;
}
