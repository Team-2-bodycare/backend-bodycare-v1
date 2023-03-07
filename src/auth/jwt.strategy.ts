import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Psicologo } from 'src/psicologos/entities/psicologo.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {
    let user: Psicologo | Paciente = await this.prisma.psicologos.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      user = await this.prisma.pacientes.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        throw new UnauthorizedException('Não autorizado');
      }
    }

    delete user.password;

    return user;
  }
}
