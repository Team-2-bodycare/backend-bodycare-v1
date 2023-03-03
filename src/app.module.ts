import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { PsicologosModule } from './psicologos/psicologos.module';

@Module({
  imports: [PacientesModule, PsicologosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
