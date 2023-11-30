import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
    @ApiOperation({ description: 'check site availability' })
    @Get('ping')
    pingpong() {
        return 'pong';
    }
}
