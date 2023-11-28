import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'jhondoe@gmail.com',
    description: 'The email of the User',
  })
  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail(
    {},
    {
      message: 'email is invalid',
    },
  )
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the User',
  })
  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;
}
