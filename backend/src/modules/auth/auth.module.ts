import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpBearerStrategy } from './http-bearer.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
    providers: [HttpBearerStrategy, AuthService],
    exports: [HttpBearerStrategy, AuthService],
})
export class AuthModule {}
