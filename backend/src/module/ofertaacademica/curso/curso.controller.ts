import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { UpdateCierreCursoDto } from './dto/update-cierre.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { UpdateAperturaCierreCursoDto } from './dto/update-aperturacierre.dto';
import { MateriaForDocenteCursoDto } from './dto/materia-docente.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.cursoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.store(createCursoDto);
  }

  @Get('/findmateriafordocente')
  @Auth( /**  N Permissions */ )
  docentegrupo( @Query() paginationDto: MateriaForDocenteCursoDto ) {
    return this.cursoService.findAllMateriaForDocente(paginationDto);
  }

  @Get('/edit/:idcurso')
  @Auth( /**  N Permissions */ )
  edit(@Param('idcurso') idcurso: string) {
    return this.cursoService.edit(idcurso);
  }

  @Get('/show/:idcurso')
  @Auth( /**  N Permissions */ )
  show(@Param('idcurso') idcurso: string) {
    return this.cursoService.show(idcurso);
  }

  @Patch('/update/:idcurso')
  @Auth( /**  N Permissions */ )
  updatePath(@Param('idcurso') idcurso: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(idcurso, updateCursoDto);
  }

  @Put('/update/:idcurso')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idcurso') idcurso: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(idcurso, updateCursoDto);
  }

  @Delete('/delete/:idcurso')
  @Auth( /**  N Permissions */ )
  delete(@Param('idcurso') idcurso: string) {
    return this.cursoService.delete(idcurso);
  }

  @Post('/aperturarcerrarcurso/:idcurso')
  @Auth( /**  N Permissions */ )
  aperturarcerrarcurso(@Param('idcurso') idcurso: string, @Body() updateAperturaCierreDto: UpdateAperturaCierreCursoDto) {
    return this.cursoService.aperturarcerrarcurso(idcurso, updateAperturaCierreDto);
  }

  @Post('/cierrecurso/:idcurso')
  @Auth( /**  N Permissions */ )
  cierrecurso(@Param('idcurso') idcurso: string, @Body() updateCierreDto: UpdateCierreCursoDto) {
    return this.cursoService.cierrecurso(idcurso, updateCierreDto);
  }
}
