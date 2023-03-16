import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsistenciacursoService } from './asistenciacurso.service';
import { CreateAsistenciaCursoDto } from './dto/create-asistenciacurso.dto';
import { UpdateAsistenciacursoDto } from './dto/update-asistenciacurso.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('asistenciacurso')
export class AsistenciacursoController {
  constructor(private readonly asistenciacursoService: AsistenciacursoService) {}

  @Post()
  create(@Body() createAsistenciacursoDto: CreateAsistenciaCursoDto) {
    return this.asistenciacursoService.create(createAsistenciacursoDto);
  }

  @Get()
  findAll() {
    return this.asistenciacursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciacursoService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAsistenciacursoDto: UpdateAsistenciacursoDto) {
  //   return this.asistenciacursoService.update(updateAsistenciacursoDto);
  // }

  @Put('/update')
  @Auth( /**  N Permissions */ )
  updatePut(@Body() updateAsistenciagrupoDto: CreateAsistenciaCursoDto) {
    return this.asistenciacursoService.update(updateAsistenciagrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciacursoService.remove(+id);
  }
}
