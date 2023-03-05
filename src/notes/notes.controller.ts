import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notas')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de uma nota',
  })
  async create(@Body() dto: CreateNotesDto) {
    return await this.notesService.create(dto);
  }

  @Get('paciente/:id')
  @ApiOperation({
    summary: 'Retornar todas as notas de um Paciente',
  })
  async findMany(@Param('id') id: string) {
    return await this.notesService.findMany(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorno de uma nota por ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar uma nota',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateNotesDto) {
    return await this.notesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma nota',
  })
  async remove(@Param('id') id: string) {
    return await this.notesService.remove(id);
  }
}
