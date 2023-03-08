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
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Paciente } from './entities/paciente.entity';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Pacientes')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de um paciente',
  })
  async create(@Body() dto: CreatePacienteDto): Promise<Paciente> {
    return await this.pacientesService.create(dto);
  }

  @Get('psicologo/:id')
  @ApiOperation({
    summary: 'Retornar todos os pacientes de um Psicologo',
  })
  async findMany(@Param('id') id: string): Promise<Paciente[]> {
    return await this.pacientesService.findMany(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorno de um paciente por ID',
  })
  async findOne(@Param('id') id: string): Promise<Paciente> {
    return await this.pacientesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um paciente',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePacienteDto,
  ): Promise<Paciente> {
    return await this.pacientesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar de um paciente',
  })
  async remove(@Param('id') id: string) {
    return await this.pacientesService.remove(id);
  }
}
