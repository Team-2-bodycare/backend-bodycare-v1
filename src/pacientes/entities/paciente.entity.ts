import { Notes } from 'src/notes/entities/notes.entity';

export class Paciente {
  id?: string;
  name: string;
  cep: string;
  address: string;
  matricula: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  psicologoId: string;
  notes?: Notes[];
}
