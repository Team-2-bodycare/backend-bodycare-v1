import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PsicologosService } from './psicologos.service';
import { CreatePsicologoDto } from './dto/create-psicologo.dto';
import { UpdatePsicologoDto } from './dto/update-psicologo.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retornar todos os psicologos',
  })
  async findAll() {
    return await this.psicologosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorno de um psicologo por ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.psicologosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar um psicologo',
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePsicologoDto) {
    return await this.psicologosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar de um psicologo',
  })
  async remove(@Param('id') id: string) {
    return await this.psicologosService.remove(id);
  }
}
