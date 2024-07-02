import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../../../../config";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwt_secret,
    });
  }

  async validate(payload: { iat: number; sub: string }): Promise<any> {
    const user = await this.authService.validateUserJwt(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
