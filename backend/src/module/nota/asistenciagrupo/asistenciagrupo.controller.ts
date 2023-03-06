import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciagrupoService } from './asistenciagrupo.service';
import { CreateAsistenciagrupoDto } from './dto/create-asistenciagrupo.dto';
import { UpdateAsistenciagrupoDto } from './dto/update-asistenciagrupo.dto';

@Controller('asistenciagrupo')
export class AsistenciagrupoController {
  constructor(private readonly asistenciagrupoService: AsistenciagrupoService) {}

  @Post()
  create(@Body() createAsistenciagrupoDto: CreateAsistenciagrupoDto) {
    return this.asistenciagrupoService.create(createAsistenciagrupoDto);
  }

  @Get()
  findAll() {
    return this.asistenciagrupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciagrupoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciagrupoDto: UpdateAsistenciagrupoDto) {
    return this.asistenciagrupoService.update(+id, updateAsistenciagrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciagrupoService.remove(+id);
  }
}
