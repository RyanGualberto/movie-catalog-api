import { Injectable, NotFoundException, Inject } from '@nestjs/common';

// dtos
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// entities
import { Movie } from './entities/movie.entity';

// typeorm
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// cache
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    await this.cacheManager.reset();
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    const cachedMovies = await this.cacheManager.get('movies');
    if (cachedMovies) {
      return cachedMovies;
    }

    const movies = await this.movieRepository.find();

    await this.cacheManager.set('movies', movies);

    return movies;
  }

  async findOneOrFail(id: number) {
    const cachedMovie = await this.cacheManager.get(`movie-${id}`);
    if (cachedMovie) {
      return cachedMovie;
    }

    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException({
        message: 'Movie not found',
      });
    }

    await this.cacheManager.set(`movie-${id}`, movie);

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.findOneOrFail(id);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);
    updateMovieDto['updatedAt'] = currentDate;

    await this.movieRepository.update(id, updateMovieDto);

    await this.cacheManager.reset();

    return await this.findOneOrFail(id);
  }

  async remove(id: number) {
    await this.findOneOrFail(id);

    await this.cacheManager.reset();

    return await this.movieRepository.delete(id);
  }
}
