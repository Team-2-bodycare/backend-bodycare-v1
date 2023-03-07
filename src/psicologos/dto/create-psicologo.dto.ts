import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePsicologoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fulano da Silva',
    description: 'Seu nome completo',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@email.com',
    description: 'Seu melhor e-mail para cadastro',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'Fulano@123',
    description: 'Senha contendo no mínimo 8 digitos',
  })
  password: string;
}
