import { Injectable, NotFoundException } from '@nestjs/common';

// dtos
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// entities
import { Movie } from './entities/movie.entity';

// typeorm
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id: number) {
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

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.findOne(id);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);
    updateMovieDto['updatedAt'] = currentDate;
    await this.movieRepository.update(id, updateMovieDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.movieRepository.delete(id);
  }
}
