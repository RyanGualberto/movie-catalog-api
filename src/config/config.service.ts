import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { dirname } from 'path';
import * as redisStore from 'cache-manager-redis-store';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [dirname(__dirname) + '/**/*.entity{.ts,.js}'],
      migrationsRun: true,
      ssl: false,
      synchronize: true,
    };
  }

  public getJwtConfig() {
    return {
      global: true,
      useFactory: () => ({
        secret: this.getValue('JWT_SECRET'),
        signOptions: {
          expiresIn: this.getValue('JWT_EXPIRATION_TIME'),
        },
      }),
    };
  }

  public getRedisConfig(): {
    isGlobal: boolean;
    store: typeof redisStore;
    host: string;
    port: number;
  } {
    return {
      isGlobal: true,
      store: redisStore,
      host: this.getValue('REDIS_HOST'),
      port: parseInt(this.getValue('REDIS_PORT')),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'JWT_SECRET',
  'JWT_EXPIRATION_TIME',
  'REDIS_HOST',
  'REDIS_PORT',
]);

export { configService };
