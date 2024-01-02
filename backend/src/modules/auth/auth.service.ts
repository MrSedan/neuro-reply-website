import { Injectable, Logger } from '@nestjs/common';
import { config } from 'config';

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);
    authUserByToken(token: string) {
        return token === config.server.access_token;
    }
}
