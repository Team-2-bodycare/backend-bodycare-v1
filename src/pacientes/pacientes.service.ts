import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { generateId } from '../utils/idGenerator';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePacienteDto) {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const id: string = randomUUID();
    const matricula: string = generateId();
    const psicologoId: string = randomUUID(); // Aqui sera substituido pelo ID do psicologo que fara o cadastro
    const data: Paciente = {
      ...dto,
      password: hashedPassword,
      id,
      matricula,
      psicologoId,
    };

    return await this.prisma.pacientes
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async findMany(id: string) {
    return await this.prisma.pacientes.findMany({
      where: { psicologoId: id },
    });
  }

  async findOne(id: string) {
    return await this.prisma.pacientes.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdatePacienteDto) {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const data: UpdatePacienteDto = {
      ...dto,
      password: hashedPassword,
    };

    return await this.prisma.pacientes
      .update({ where: { id }, data })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    return await this.prisma.pacientes.delete({ where: { id } });
  }
}
