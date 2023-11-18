import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IGetUser } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private adminService: UserService) {}

    @ApiOperation({
        description: 'Create or get user from db',
    })
    @Post('get')
    async getUser(@Body() data: IGetUser) {
        return await this.adminService.getUser(data);
    }
}
