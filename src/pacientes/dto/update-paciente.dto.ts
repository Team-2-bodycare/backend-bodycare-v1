import { PartialType } from '@nestjs/swagger';
import { CreatePacienteDto } from './create-paciente.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
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
    example: '(xx)x xxxx-xxxx',
    description: 'Seu numero de telefone para contato',
  })
  phone: string;
}
