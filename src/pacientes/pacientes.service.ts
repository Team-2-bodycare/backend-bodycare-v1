import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import * as bcrypt from 'bcryptjs';
import { generateId } from '../utils/idGenerator';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  private psicologoSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    crp: true,
    phone: true,
    cep: true,
    clinicAddress: true,
    startingTime: true,
    endTime: true,
    createdAt: true,
    updatedAt: true,
  };

  private pacienteSelect = {
    id: true,
    name: true,
    cep: true,
    address: true,
    matricula: true,
    email: true,
    password: false,
    phone: true,
    psicologoId: false,
    createdAt: true,
    updatedAt: true,
  };

  private notesSelect = {
    id: true,
    note: true,
    score: true,
    comment: true,
    createdAt: true,
    updatedAt: true,
    pacienteId: false,
  };

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const matricula: string = generateId();
    const data = {
      ...dto,
      password: hashedPassword,
      matricula,
    };

    return await this.prisma.pacientes
      .create({
        data,
        select: {
          ...this.pacienteSelect,
          notes: { select: { ...this.notesSelect } },
          psicologo: { select: { ...this.psicologoSelect } },
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  async findMany(id: string): Promise<Paciente[]> {
    return await this.prisma.pacientes.findMany({
      where: { psicologoId: id },
      select: {
        ...this.pacienteSelect,
        notes: { select: { ...this.notesSelect } },
        psicologo: { select: { ...this.psicologoSelect } },
      },
    });
  }

  async findOne(id: string): Promise<Paciente> {
    return await this.prisma.pacientes.findUnique({
      where: { id },
      select: {
        ...this.pacienteSelect,
        notes: { select: { ...this.notesSelect } },
        psicologo: { select: { ...this.psicologoSelect } },
      },
    });
  }

  async update(id: string, dto: UpdatePacienteDto): Promise<Paciente> {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const data: UpdatePacienteDto = {
      ...dto,
      password: hashedPassword,
    };

    return await this.prisma.pacientes
      .update({
        where: { id },
        data,
        select: {
          ...this.pacienteSelect,
          notes: { select: { ...this.notesSelect } },
          psicologo: { select: { ...this.psicologoSelect } },
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    return await this.prisma.pacientes.delete({ where: { id } });
  }
}
