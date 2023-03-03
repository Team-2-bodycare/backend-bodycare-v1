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
  @ApiProperty({
    example: 'xx.xxx-xxx',
    description: 'CEP de onde voce mora',
  })
  cep: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rua/Av Siqueira Junior, 77',
    description: 'endereço de onde você mora + numero',
  })
  address: string;

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
  @ApiProperty({
    example: '(xx)x xxxx-xxxx',
    description: 'Seu numero de telefone para contato',
  })
  phone: string;
}
