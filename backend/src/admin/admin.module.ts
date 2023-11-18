import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [LibsModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
