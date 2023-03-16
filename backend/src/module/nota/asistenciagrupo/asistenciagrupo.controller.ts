import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Auth } from 'src/module/auth/decorators/auth.decorator';
import { AsistenciagrupoService } from './asistenciagrupo.service';
import { CreateAsistenciaGrupoDto } from './dto/create-asistenciagrupo.dto';
import { UpdateAsistenciagrupoDto } from './dto/update-asistenciagrupo.dto';

@Controller('asistenciagrupo')
export class AsistenciagrupoController {
  constructor(private readonly asistenciagrupoService: AsistenciagrupoService) {}

  @Post()
  create(@Body() createAsistenciagrupoDto: CreateAsistenciaGrupoDto) {
    return this.asistenciagrupoService.create(createAsistenciagrupoDto);
  }

  @Get()
  findAll() {
    return this.asistenciagrupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciagrupoService.findOne(id);
  }

  @Patch(':id')
  updatePatch(@Param('id') id: string, @Body() updateAsistenciagrupoDto: UpdateAsistenciagrupoDto) {
    return this.asistenciagrupoService.update(updateAsistenciagrupoDto);
  }

  @Put('/update')
  @Auth( /**  N Permissions */ )
  updatePut(@Body() updateAsistenciagrupoDto: CreateAsistenciaGrupoDto) {
    return this.asistenciagrupoService.update(updateAsistenciagrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciagrupoService.remove(+id);
  }
}
