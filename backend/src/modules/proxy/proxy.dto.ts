import { ApiProperty } from "@nestjs/swagger";

export class IProxyUser {
  @ApiProperty({ description: "user name of user to identify them", example: "username" })
  readonly userName!: string;
  @ApiProperty({ description: "some user description if you want", example: "Description of user" })
  readonly description?: string;
  @ApiProperty({ description: "user link to connect to the proxy", example: "vless://...." })
  readonly link!: string;
  @ApiProperty({ description: "telegram user id to connect to user entity", example: "187564" })
  readonly user_id?: string;
  @ApiProperty({ description: "telegram user id", example: "111111" })
  readonly tg_id: string;
}

export class IOperation {
  @ApiProperty({ description: "user name of user, that made new operation", example: "username" })
  readonly userName!: string;
}

export class IProxyInfoText {
  @ApiProperty({ description: "proxy info text", example: "Working normal" })
  readonly text!: string;
}

export class IProxyInfoEnabled {
  @ApiProperty({ description: "proxy info enabled", example: true })
  readonly enabled!: boolean;
}
