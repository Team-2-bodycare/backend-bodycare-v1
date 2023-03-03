import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PsicologosService } from './psicologos.service';
import { CreatePsicologoDto } from './dto/create-psicologo.dto';
import { UpdatePsicologoDto } from './dto/update-psicologo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Psicologos')
@Controller('psicologos')
export class PsicologosController {
  constructor(private readonly psicologosService: PsicologosService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de um psicologo',
  })
  async create(@Body() dto: CreatePsicologoDto) {
    return await this.psicologosService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retornar todos os psicologos',
  })
  async findAll() {
    return await this.psicologosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorno de um psicologo por ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.psicologosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um psicologo',
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePsicologoDto) {
    return await this.psicologosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar de um psicologo',
  })
  async remove(@Param('id') id: string) {
    return await this.psicologosService.remove(id);
  }
}
