import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IGetUser } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        description: 'Create or get user from db',
    })
    @Post('get')
    async getUser(@Body() data: IGetUser) {
        return await this.userService.getUser(data);
    }
    @Put('ban/:id')
    async banUser(@Param('id') id: string) {
        return await this.userService.banUser(id);
    }
    @Put('unBan/:id')
    async unBanUser(@Param('id') id: string) {
        return await this.userService.unBanUser(id);
    }

}
