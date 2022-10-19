import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Get('/index')
  findAll() {
    return this.materiaService.findAll();
  }

  @Post('/store')
  store(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.store(createMateriaDto);
  }

  @Get('/edit/:idmateria')
  edit(@Param('idmateria') id: string) {
    return this.materiaService.edit(id);
  }

  @Get('/show/:idmateria')
  show(@Param('idmateria') id: string) {
    return this.materiaService.show(id);
  }

  @Put('/update/:idmateria')
  update(@Param('idmateria') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(id, updateMateriaDto);
  }

  @Delete('/delete/:idmateria')
  remove(@Param('idmateria') id: string) {
    return this.materiaService.remove(id);
  }
}
