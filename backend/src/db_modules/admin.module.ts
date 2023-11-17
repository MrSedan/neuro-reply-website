import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db.modules';
import { AdminService } from 'src/db_service/admin.service';
import { adminProviders } from 'src/db_providers/admin.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...adminProviders, AdminService],
})
export class PhotoModule {}
