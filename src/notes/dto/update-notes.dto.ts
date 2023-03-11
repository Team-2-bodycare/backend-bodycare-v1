import { PartialType } from '@nestjs/swagger';
import { CreateNotesDto } from './create-notes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNotesDto extends PartialType(CreateNotesDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Preciso melhorar',
    description: 'Comentário do Paciente',
  })
  comment: string;
}
