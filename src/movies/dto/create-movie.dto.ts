import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @IsNotEmpty({
    message: 'synopsis is required',
  })
  synopsis: string;

  @IsNotEmpty({
    message: 'year is required',
  })
  year: number;
}
