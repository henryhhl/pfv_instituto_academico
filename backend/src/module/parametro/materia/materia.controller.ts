import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.materiaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiaService.store(createMateriaDto);
  }

  @Get('/edit/:idmateria')
  @Auth( /**  N Permissions */ )
  edit(@Param('idmateria') id: string) {
    return this.materiaService.edit(id);
  }

  @Get('/show/:idmateria')
  @Auth( /**  N Permissions */ )
  show(@Param('idmateria') id: string) {
    return this.materiaService.show(id);
  }

  @Put('/update/:idmateria')
  @Auth( /**  N Permissions */ )
  update(@Param('idmateria') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiaService.update(id, updateMateriaDto);
  }

  @Delete('/delete/:idmateria')
  @Auth( /**  N Permissions */ )
  delete(@Param('idmateria') id: string) {
    return this.materiaService.delete(id);
  }
}
