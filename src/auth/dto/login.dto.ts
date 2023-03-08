import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email ou matricula do usuário que está tentando logar',
    example: 'usuario@mail.com',
  })
  credential: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário que está tentando logar',
    example: '123456aSd@',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'saber se é paciente ou psicologo que esta logando',
    example: 'paciente',
  })
  type: string;
}
