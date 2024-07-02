import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { WebUser } from "libs/database/web_user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(WebUser) private userRepository: Repository<WebUser>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { login: username } });
    if (!user) throw new UnauthorizedException("User not found");
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException("Wrong password");
    const payload = { sub: user.uuid, username: user.login };
    this.logger.log(`User ${user.login} logged in`);
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validateUserJwt(uuid: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ uuid: uuid });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return {
      login: user.login,
      telegram_id: user.telegram_id,
    };
  }

  async register(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { login: username } });
    if (user) throw new UnauthorizedException("User already exists");
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      login: username,
      password: hash,
    });
    await this.userRepository.save(newUser);
    this.logger.log(`User ${username} registered`);
    const payload = { sub: newUser.uuid, username: newUser.login };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
