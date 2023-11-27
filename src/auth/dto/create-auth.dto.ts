import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({
    message: 'username is required',
  })
  username: string;

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
