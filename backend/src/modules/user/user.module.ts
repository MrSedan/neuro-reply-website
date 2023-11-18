import { Module } from '@nestjs/common';
import { LibsModule } from 'libs/libs.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [LibsModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
