import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciacursoService } from './asistenciacurso.service';
import { CreateAsistenciacursoDto } from './dto/create-asistenciacurso.dto';
import { UpdateAsistenciacursoDto } from './dto/update-asistenciacurso.dto';

@Controller('asistenciacurso')
export class AsistenciacursoController {
  constructor(private readonly asistenciacursoService: AsistenciacursoService) {}

  @Post()
  create(@Body() createAsistenciacursoDto: CreateAsistenciacursoDto) {
    return this.asistenciacursoService.create(createAsistenciacursoDto);
  }

  @Get()
  findAll() {
    return this.asistenciacursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciacursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciacursoDto: UpdateAsistenciacursoDto) {
    return this.asistenciacursoService.update(+id, updateAsistenciacursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciacursoService.remove(+id);
  }
}
