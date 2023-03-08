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

  async validate(payload: { credential: string; type: string }) {
    if (payload.type === 'psicologo') {
      const user: Psicologo = await this.prisma.psicologos.findUnique({
        where: { email: payload.credential },
      });

      if (!user) {
        throw new UnauthorizedException('Não autorizado');
      }

      delete user.password;

      return user;
    } else if (payload.type === 'paciente') {
      const user: Paciente = await this.prisma.pacientes.findFirst({
        where: {
          OR: [
            { matricula: payload.credential },
            { email: payload.credential },
          ],
        },
      });

      if (!user) {
        throw new UnauthorizedException('Não autorizado');
      }

      delete user.password;

      return user;
    }
  }
}
