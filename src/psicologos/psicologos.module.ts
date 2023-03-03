import { Module } from '@nestjs/common';
import { PsicologosService } from './psicologos.service';
import { PsicologosController } from './psicologos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PsicologosController],
  providers: [PsicologosService],
  imports: [PrismaModule],
})
export class PsicologosModule {}
