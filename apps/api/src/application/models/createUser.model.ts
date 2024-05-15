import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestUser {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}
