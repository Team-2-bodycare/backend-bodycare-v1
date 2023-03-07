import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PsicologosModule } from './psicologos/psicologos.module';

@Module({
  imports: [AuthModule, PacientesModule, PsicologosModule, NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
