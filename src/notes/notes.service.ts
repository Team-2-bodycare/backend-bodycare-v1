import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Notes } from './entities/notes.entity';
import * as AWS from 'aws-sdk';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  private pacienteSelect = {
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
    comment: true,
    createdAt: true,
    updatedAt: true,
    pacienteId: false,
  };

  async create(dto: CreateNotesDto): Promise<Notes> {
    const data = {
      ...dto,
    };

    const note: Notes = await this.prisma.notes
      .create({
        data,
        select: {
          ...this.notesSelect,
          paciente: { select: { ...this.pacienteSelect } },
        },
      })
      .catch(handleErrorConstraintUnique);

    const comprehend = new AWS.Comprehend({
      region: process.env.REGION,
      accessKeyId: process.env.KEY,
      secretAccessKey: process.env.SECRETKEY,
    });

    const result = await comprehend
      .detectSentiment({ Text: note.note, LanguageCode: 'pt' })
      .promise();

    const dataScore: CreateScoreDto = {
      positive: result.SentimentScore.Positive,
      negative: result.SentimentScore.Negative,
      mixed: result.SentimentScore.Mixed,
      neutral: result.SentimentScore.Neutral,
      noteId: note.id,
    };

    await this.prisma.score.create({ data: dataScore });

    return note;
  }

  async findMany(id: string): Promise<Notes[]> {
    return await this.prisma.notes.findMany({
      where: { pacienteId: id },
      select: {
        ...this.notesSelect,
        paciente: { select: { ...this.pacienteSelect } },
        score: true,
      },
    });
  }

  async findOne(id: string): Promise<Notes> {
    return await this.prisma.notes.findUnique({
      where: { id },
      select: {
        ...this.notesSelect,
        paciente: { select: { ...this.pacienteSelect } },
        score: true,
      },
    });
  }

  async update(id: string, dto: UpdateNotesDto): Promise<Notes> {
    const data: UpdateNotesDto = {
      ...dto,
    };

    return await this.prisma.notes
      .update({
        where: { id },
        data,
        select: {
          ...this.notesSelect,
          paciente: { select: { ...this.pacienteSelect } },
          score: true,
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    return await this.prisma.notes.delete({ where: { id } });
  }
}
