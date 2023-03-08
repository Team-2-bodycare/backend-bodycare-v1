import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Psicologo } from 'src/psicologos/entities/psicologo.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private psicologoSelect01 = {
    id: true,
    name: true,
    email: true,
    password: true,
    crp: true,
    phone: true,
    cep: true,
    clinicAddress: true,
    startingTime: true,
    endTime: true,
    createdAt: true,
    updatedAt: true,
  };

  private psicologoSelect02 = {
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

  private pacienteSelect01 = {
    id: true,
    name: true,
    cep: true,
    address: true,
    matricula: true,
    email: true,
    password: true,
    phone: true,
    psicologoId: false,
    createdAt: true,
    updatedAt: true,
  };

  private pacienteSelect02 = {
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
    score: false,
    comment: true,
    createdAt: true,
    updatedAt: true,
    pacienteId: false,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password, type } = dto;

    if (type === 'psicologo') {
      const user: Psicologo = await this.prisma.psicologos.findUnique({
        where: { email },
        select: {
          ...this.psicologoSelect01,
          pacientes: {
            select: {
              ...this.pacienteSelect02,
              notes: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('Email ou senha inválidos');
      }

      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordMatch) {
        throw new NotFoundException('Email ou senha inválidos');
      }

      delete user.password;

      const token: string = this.jwtService.sign({ email, type });

      return { token, user };
    }

    if (type === 'paciente') {
      const user: Paciente = await this.prisma.pacientes.findUnique({
        where: { email },
        select: {
          ...this.pacienteSelect01,
          psicologo: {
            select: {
              ...this.psicologoSelect02,
            },
          },
          notes: {
            select: {
              ...this.notesSelect,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('Email ou senha inválidos');
      }

      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordMatch) {
        throw new NotFoundException('Email ou senha inválidos');
      }

      delete user.password;

      const token: string = this.jwtService.sign({ email, type });

      return { token, user };
    }
  }
}
