import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
    ) {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());

        let token = this.extractTokenFromHeader(request.headers);

        if (!token) {
            token = request.query.access_token || request.body.access_token;
        }
        if (allowUnauthorizedRequest || this.authService.authUserByToken(token)) return true;
        throw new UnauthorizedException('Unathorized!');
    }

    private extractTokenFromHeader(headers: any): string | null {
        if (headers && headers.authorization) {
            const authHeader = headers.authorization as string;
            const headerParts = authHeader.split(' ');

            if (headerParts.length === 2 && headerParts[0].toLowerCase() === 'bearer') {
                return headerParts[1];
            }
        }
        return null;
    }
}
