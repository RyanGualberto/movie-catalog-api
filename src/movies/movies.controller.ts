import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

// services
import { MoviesService } from './movies.service';

// dtos
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// guards
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Movies')
@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateMovieDto,
  })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
    type: [CreateMovieDto],
  })
  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: CreateMovieDto,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    type: Object,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateMovieDto,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    type: Object,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(+id, updateMovieDto);
  }

  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    type: Object,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(+id);
  }
}
