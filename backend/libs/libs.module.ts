import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Admin } from './database/admin.entity';
import { Post } from './database/post.entity';
import { Image } from './database/image.entity';
import { Payment } from './database/payment.entity';
import { ProxyUser } from './database/ProxyUser.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Admin, Post, Image, Payment, ProxyUser])],
    exports: [TypeOrmModule],
})
export class LibsModule {}
