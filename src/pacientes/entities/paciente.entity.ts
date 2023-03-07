import { Notes } from 'src/notes/entities/notes.entity';

export class Paciente {
  id?: string;
  name: string;
  matricula: string;
  email: string;
  password: string;
  cep?: string;
  address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;

  psicologoId: string;
  notes?: Notes[];
}
