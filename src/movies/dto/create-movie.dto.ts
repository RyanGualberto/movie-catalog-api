import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'The title of the Movie',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @ApiProperty({
    example: 'The Shawshank Redemption description',
    description: 'The description of the Movie',
  })
  @IsNotEmpty({
    message: 'synopsis is required',
  })
  synopsis: string;

  @ApiProperty({
    example: 1994,
    description: 'The year of the Movie',
  })
  @IsNotEmpty({
    message: 'year is required',
  })
  year: number;
}
