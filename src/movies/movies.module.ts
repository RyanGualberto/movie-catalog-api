import { Module } from '@nestjs/common';

// services
import { MoviesService } from './movies.service';

// controllers
import { MoviesController } from './movies.controller';

// entities
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
