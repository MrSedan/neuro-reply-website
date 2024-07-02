import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: "User name", example: "test" }) readonly username: string;
  @ApiProperty({ description: "User password", example: "test" }) readonly password: string;
}
