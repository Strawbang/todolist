import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe'
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password of the user. Must be at least 6 characters long.',
    example: 'password123',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
