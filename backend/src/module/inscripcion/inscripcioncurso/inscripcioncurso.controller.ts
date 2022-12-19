import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { InscripcionCursoService } from './inscripcioncurso.service';
import { CreateInscripcionCursoDto } from './dto/create-inscripcioncurso.dto';
import { UpdateInscripcionCursoDto } from './dto/update-inscripcioncurso.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { InscripcionCursoPaginationDto } from './dto/pagination.dto';

@Controller('inscripcioncurso')
export class InscripcionCursoController {
  constructor(private readonly inscripcioncursoService: InscripcionCursoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: InscripcionCursoPaginationDto ) {
    return this.inscripcioncursoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createInscripcioncursoDto: CreateInscripcionCursoDto) {
    return this.inscripcioncursoService.store(createInscripcioncursoDto);
  }

  @Get('/edit/:idinscripcioncurso')
  @Auth( /**  N Permissions */ )
  edit(@Param('idinscripcioncurso') idinscripcioncurso: string) {
    return this.inscripcioncursoService.edit(idinscripcioncurso);
  }

  @Get('/show/:idinscripcioncurso')
  @Auth( /**  N Permissions */ )
  show(@Param('idinscripcioncurso') idinscripcioncurso: string) {
    return this.inscripcioncursoService.show(idinscripcioncurso);
  }

  @Patch('/update/:idinscripcioncurso')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idinscripcioncurso') idinscripcioncurso: string, @Body() updateInscripcioncursoDto: UpdateInscripcionCursoDto) {
    return this.inscripcioncursoService.update(idinscripcioncurso, updateInscripcioncursoDto);
  }

  @Put('/update/:idinscripcioncurso')
  @Auth( /**  N Permissions */ )
  update(@Param('idinscripcioncurso') idinscripcioncurso: string, @Body() updateInscripcioncursoDto: UpdateInscripcionCursoDto) {
    return this.inscripcioncursoService.update(idinscripcioncurso, updateInscripcioncursoDto);
  }

  @Delete('/delete/:idinscripcioncurso')
  @Auth( /**  N Permissions */ )
  delete(@Param('idinscripcioncurso') idinscripcioncurso: string) {
    return this.inscripcioncursoService.delete(idinscripcioncurso);
  }
}
