import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export interface LoggedUser extends Omit<User, 'password'> {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<LoggedUser> {
    createAuthDto['password'] = await this.hashPassword(
      createAuthDto['password'],
    );
    createAuthDto['email'] = createAuthDto['email'].toLowerCase();

    const user = await this.usersRepository.save(createAuthDto);
    delete user['password'];
    return {
      ...user,
      accessToken: await this.jwt.signAsync({
        id: user.id,
      }),
    };
  }

  async login(
    loginAuthDto: Omit<CreateAuthDto, 'username'>,
  ): Promise<LoggedUser> {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginAuthDto['email'].toLowerCase(),
      },
    });

    if (!user) {
      throw new BadRequestException({
        message: 'Email/Senha inválidos',
      });
    }

    await this.comparePasswords(loginAuthDto['password'], user['password']);

    delete user.password;

    return {
      ...user,
      accessToken: await this.jwt.signAsync({
        id: user.id,
      }),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePasswords(
    newPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    if (!(await bcrypt.compare(newPassword, passwordHash))) {
      throw new BadRequestException({
        message: 'Email/Senha inválidos',
      });
    }

    return true;
  }
}
