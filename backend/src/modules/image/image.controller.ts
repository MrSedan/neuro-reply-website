import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAddImage } from './image.dto';
import { ImageService } from './image.service';

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @ApiOperation({ description: 'A method to add photo to post' })
    @Post('add')
    async addImage(@Body() data: IAddImage) {
        return await this.imageService.add(data);
    }
}
