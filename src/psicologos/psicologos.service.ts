import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePsicologoDto } from './dto/create-psicologo.dto';
import { UpdatePsicologoDto } from './dto/update-psicologo.dto';
import * as bcrypt from 'bcryptjs';
import { Psicologo } from './entities/psicologo.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class PsicologosService {
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
    comment: true,
    createdAt: true,
    updatedAt: true,
    pacienteId: false,
  };

  async create(dto: CreatePsicologoDto): Promise<Psicologo> {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const data = { ...dto, password: hashedPassword };

    return await this.prisma.psicologos
      .create({ data, select: { ...this.psicologoSelect } })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(): Promise<Psicologo[]> {
    return await this.prisma.psicologos.findMany({
      select: {
        ...this.psicologoSelect,
        pacientes: {
          select: {
            ...this.pacienteSelect,
            notes: {
              select: { ...this.notesSelect, score: true },
            },
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Psicologo> {
    return await this.prisma.psicologos.findUnique({
      where: { id },
      select: {
        ...this.psicologoSelect,
        pacientes: {
          select: {
            ...this.pacienteSelect,
            notes: {
              select: { ...this.notesSelect, score: true },
            },
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdatePsicologoDto): Promise<Psicologo> {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const data: UpdatePsicologoDto = {
      ...dto,
      password: hashedPassword,
    };

    return this.prisma.psicologos
      .update({
        where: { id },
        data,
        select: {
          ...this.psicologoSelect,
          pacientes: {
            select: {
              ...this.pacienteSelect,
              notes: {
                select: { ...this.notesSelect, score: true },
              },
            },
          },
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    return await this.prisma.psicologos.delete({ where: { id } });
  }
}
