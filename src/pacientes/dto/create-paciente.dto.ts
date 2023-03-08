import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fulano da Silva',
    description: 'Seu nome completo',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'Fulano@123',
    description: 'Senha contendo no mínimo 8 digitos',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'ID do psicologo',
  })
  psicologoId: string;
}
