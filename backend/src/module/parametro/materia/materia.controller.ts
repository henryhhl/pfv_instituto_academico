import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.materiaService.findAll(paginationDto);
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
  delete(@Param('idmateria') id: string) {
    return this.materiaService.delete(id);
  }
}
