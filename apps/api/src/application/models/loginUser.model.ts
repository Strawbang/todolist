import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestUser {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}