import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

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
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com'
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
