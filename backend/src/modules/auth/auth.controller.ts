import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: "Login into system",
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({
    description: "Register into system",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  register(@Body() signInDto: LoginDto) {
    return this.authService.register(signInDto.username, signInDto.password);
  }

  @ApiOperation({
    description: "Get user profile",
  })
  @UseGuards(JwtGuard)
  @Get("profile")
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
