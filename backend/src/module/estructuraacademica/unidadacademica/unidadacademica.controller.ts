import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UnidadacademicaService } from './unidadacademica.service';
import { CreateUnidadAcademicaDto } from './dto/create-unidadacademica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidadacademica.dto';

@Controller('unidadacademica')
export class UnidadacademicaController {
  constructor(private readonly unidadacademicaService: UnidadacademicaService) {}

  @Get('/index')
  findAll() {
    return this.unidadacademicaService.findAll();
  }

  @Post('/store')
  store(@Body() createUnidadacademicaDto: CreateUnidadAcademicaDto) {
    return this.unidadacademicaService.create(createUnidadacademicaDto);
  }

  @Get('/edit/:idunidadacademica')
  edit(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.edit(id);
  }

  @Get('/show/:idunidadacademica')
  show(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.show(id);
  }

  @Patch('/update/:idunidadacademica')
  updatePatch(@Param('idunidadacademica') id: string, @Body() updateUnidadacademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadacademicaService.update(id, updateUnidadacademicaDto);
  }

  @Put('/update/:idunidadacademica')
  update(@Param('idunidadacademica') id: string, @Body() updateUnidadacademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadacademicaService.update(id, updateUnidadacademicaDto);
  }

  @Delete('/delete/:idunidadacademica')
  remove(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.remove(id);
  }
}
