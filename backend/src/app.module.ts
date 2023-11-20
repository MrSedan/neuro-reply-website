import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'config';
import { LibsModule } from 'libs/libs.module';
import { AppInitService } from './modules/initialization/app.init.service';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
    imports: [AdminModule, LibsModule, UserModule, TypeOrmModule.forRoot(<TypeOrmModuleOptions>config.database)],
    controllers: [],
    providers: [AppInitService],
})
export class AppModule {}
