import { Paciente } from 'src/pacientes/entities/paciente.entity';

export class Psicologo {
  id?: string;
  name: string;
  email: string;
  password: string;
  crp?: string;
  phone?: string;
  cep?: string;
  clinicAddress?: string;
  startingTime?: string;
  endTime?: string;
  createdAt: Date;
  updatedAt: Date;

  pacientes?: Paciente[];
}
