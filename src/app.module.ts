import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PsicologosModule } from './psicologos/psicologos.module';

@Module({
  imports: [PacientesModule, PsicologosModule, NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
