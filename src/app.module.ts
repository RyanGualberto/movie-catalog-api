import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
