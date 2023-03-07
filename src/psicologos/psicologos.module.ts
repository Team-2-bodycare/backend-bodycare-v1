import { Module } from '@nestjs/common';
import { PsicologosService } from './psicologos.service';
import { PsicologosController } from './psicologos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PsicologosController],
  providers: [PsicologosService],
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '72h' },
    }),
  ],
})
export class PsicologosModule {}
