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

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'crp132456',
    description: 'Conselho Regional de Psicologia',
  })
  crp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '(xx)x xxxx-xxxx',
    description: 'Seu numero de telefone para contato',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xx.xxx-xxx',
    description: 'CEP da sua clinica',
  })
  cep: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rua/Av Siqueira Junior, 77',
    description: 'endereço da sua clinica',
  })
  clinicAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '08:00',
    description: 'hora de inicio de atendimento',
  })
  startingTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '17:00',
    description: 'hora de fim de atendimento',
  })
  endTime: string;
}
