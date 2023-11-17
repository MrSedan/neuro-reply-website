import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
})
export class LibsModule {}
