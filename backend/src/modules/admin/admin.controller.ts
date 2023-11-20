import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @ApiOperation({
        description: 'Get admins from db',
    })
    @Get('get')
    async getAdmin() {
        return await this.adminService.getAdmins();
    }
    @ApiOperation({ description: 'Check admin is or not' })
    @Get('is-admin/:id')
    async isAdmin(@Param('id') id: string) {
        return await this.adminService.checkIsAdmin(id);
    }
}
