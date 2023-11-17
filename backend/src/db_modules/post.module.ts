import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db.modules';
import { PostService } from 'src/db_service/post.service';
import { postProviders } from 'src/db_providers/post.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...postProviders, PostService],
})
export class PhotoModule {}
