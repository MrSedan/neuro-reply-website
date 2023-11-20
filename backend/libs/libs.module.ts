import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Admin } from './database/admin.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User, Admin])],
    exports: [TypeOrmModule],
})
export class LibsModule {}
