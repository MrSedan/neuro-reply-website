import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Admin } from './database/admin.entity';
import { Post } from './database/post.entity';
import { Image } from './database/image.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Admin, Post, Image])],
    exports: [TypeOrmModule],
})
export class LibsModule {}
