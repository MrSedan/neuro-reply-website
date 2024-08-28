import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./database/admin.entity";
import { Image } from "./database/image.entity";
import { Payment } from "./database/payment.entity";
import { Post } from "./database/post.entity";
import { ProxyInfo } from "./database/proxy_info";
import { ProxyUser } from "./database/proxy_user.entity";
import { BotSettings } from "./database/settings.entity";
import { User } from "./database/user.entity";
import { WebUser } from "./database/web_user.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Admin,
      Post,
      Image,
      Payment,
      ProxyUser,
      BotSettings,
      WebUser,
      ProxyInfo,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class LibsModule {}
