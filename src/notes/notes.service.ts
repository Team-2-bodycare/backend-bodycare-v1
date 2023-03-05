import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Notes } from './entities/notes.entity';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotesDto) {
    const data: Notes = {
      ...dto
    };

    return await this.prisma.notes
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async findMany(id: string) {
    return await this.prisma.notes.findMany({
      where: { pacienteId: id },
    });
  }

  async findOne(id: string) {
    return await this.prisma.notes.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateNotesDto) {
    const data: UpdateNotesDto = {
      ...dto
    };

    return await this.prisma.notes
      .update({ where: { id }, data })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    return await this.prisma.notes.delete({ where: { id } });
  }
}
