import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'config';
import { LibsModule } from 'libs/libs.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppInitService } from './modules/initialization/app.init.service';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [LibsModule, PostModule, AdminModule, UserModule, TypeOrmModule.forRoot(<TypeOrmModuleOptions>config.database)],
    controllers: [],
    providers: [AppInitService],
})
export class AppModule {}
