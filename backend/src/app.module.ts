import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'config';
import { LibsModule } from 'libs/libs.module';
import { AppController } from './app.controller';
import { AdminModule } from './modules/admin/admin.module';
import { ImageModule } from './modules/image/image.module';
import { AppInitService } from './modules/initialization/app.init.service';
import { PostModule } from './modules/post/post.module';
import { ProxyModule } from './modules/proxy/proxy.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        LibsModule,
        PostModule,
        AdminModule,
        UserModule,
        ImageModule,
        ProxyModule,
        SettingsModule,
        TypeOrmModule.forRoot(<TypeOrmModuleOptions>config.database),
    ],
    controllers: [AppController],
    providers: [AppInitService],
})
export class AppModule {}
