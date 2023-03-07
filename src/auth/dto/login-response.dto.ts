import { ApiProperty } from '@nestjs/swagger';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Psicologo } from 'src/psicologos/entities/psicologo.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token gerado no login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário que realizou o login',
  })
  user: Paciente | Psicologo;
}
