import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
    imports: [LibsModule],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule {}
