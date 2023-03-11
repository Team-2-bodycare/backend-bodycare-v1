import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScoreDto {
  @IsNumber()
  @IsNotEmpty()
  positive: number;

  @IsNumber()
  @IsNotEmpty()
  negative: number;

  @IsNumber()
  @IsNotEmpty()
  mixed: number;

  @IsNumber()
  @IsNotEmpty()
  neutral: number;

  @IsString()
  @IsNotEmpty()
  noteId: string;
}
