import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db.modules';
import { photoProviders } from 'src/db_providers/photo.providers';
import { PhotoService } from 'src/db_service/photo.service';

@Module({
    imports: [DatabaseModule],
    providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}
