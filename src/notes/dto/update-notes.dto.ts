import { PartialType } from '@nestjs/swagger';
import { CreateNotesDto } from './create-notes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateNotesDto extends PartialType(CreateNotesDto) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '10',
    description: 'Score do Paciente',
  })
  score: number;
}
