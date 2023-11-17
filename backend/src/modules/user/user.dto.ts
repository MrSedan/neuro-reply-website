import { ApiProperty } from '@nestjs/swagger';

export class IGetUser {
    @ApiProperty({ description: 'telegram id', example: '123456' }) readonly id: string;
    @ApiProperty({ description: 'telegram username', example: 'durov' }) readonly username?: string;
}
