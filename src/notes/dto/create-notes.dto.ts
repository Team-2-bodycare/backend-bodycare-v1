import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hoje estou bem melhor',
    description: 'Nota do Paciente',
  })
  note: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '5226e385-e5f1-4df9-8d32-45570eba37dc',
    description: 'ID do Paciente',
  })
  pacienteId: string;
}
