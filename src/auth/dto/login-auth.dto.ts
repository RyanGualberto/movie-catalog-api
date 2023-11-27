import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto {
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

  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;
}
