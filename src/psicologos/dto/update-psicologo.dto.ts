import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePsicologoDto } from './create-psicologo.dto';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePsicologoDto extends PartialType(CreatePsicologoDto) {
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
