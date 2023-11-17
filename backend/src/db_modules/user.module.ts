import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db.modules';
import { UserService } from 'src/db_service/user.service';
import { userProviders } from 'src/db_providers/user.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...userProviders, UserService],
})
export class PhotoModule {}
