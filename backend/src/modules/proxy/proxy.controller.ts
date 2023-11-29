import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IOperation, IProxyUser } from './proxy.dto';
import { ProxyService } from './proxy.service';

@ApiTags('Proxy')
@Controller('proxy')
export class ProxyController {
    constructor(private proxyService: ProxyService) {}

    @ApiOperation({ description: 'Method to create a new proxy user' })
    @Post('new-user')
    async newUser(@Body() data: IProxyUser) {
        return await this.proxyService.newUser(data);
    }

    @ApiOperation({ description: 'get user by its username' })
    @Get('get-user/:userName')
    async getUser(@Param('userName') userName: string) {
        return await this.proxyService.getUser(userName);
    }

    @ApiOperation({ description: 'get all users of proxy' })
    @Get('get-all-users')
    async getAllUsers() {
        return await this.proxyService.getAllUsers();
    }

    @ApiOperation({ description: 'adding an operation to user' })
    @Post('operation/add')
    async addOperation(@Body() data: IOperation) {
        return await this.proxyService.addOperation(data);
    }

    @ApiOperation({ description: 'get user payments' })
    @Get('operation/get/:userName')
    async getOperations(@Param('userName') userName: string) {
        return this.proxyService.getOperations(userName);
    }

    @ApiOperation({ description: 'get all payments' })
    @Get('operation/get-all')
    async getAllOperations() {
        return this.proxyService.getAllOperations();
    }
}
