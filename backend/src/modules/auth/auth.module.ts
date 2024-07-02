import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LibsModule } from "libs/libs.module";
import { config } from "../../../config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    LibsModule,
    PassportModule,
    JwtModule.register({
      secret: config.auth.jwt_secret,
      global: true,
      signOptions: { expiresIn: 86000 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
