import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { InscripcionGrupoService } from './inscripciongrupo.service';
import { InscripcionGrupoPaginationDto } from './dto/pagination.dto';
import { UpdateInscripcionGrupoDto } from './dto/update-inscripciongrupo.dto';
import { CreateInscripcionGrupoDto } from './dto/create-inscripciongrupo.dto';
import { FindEstudianteForMateriaDto } from './dto/findestudianteformateria.dto';

@Controller('inscripciongrupo')
export class InscripcionGrupoController {
  constructor(private readonly inscripciongrupoService: InscripcionGrupoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: InscripcionGrupoPaginationDto ) {
    return this.inscripciongrupoService.findAll(paginationDto);
  }

  @Get('/findestudianteformateria')
  @Auth( /**  N Permissions */ )
  grupopensum( @Query() paginationDto: FindEstudianteForMateriaDto ) {
    return this.inscripciongrupoService.FindEstudianteForMateriaDto(paginationDto);
  }

  @Get('/findestudianteforparametrocalificacion/:fkidgrupopensumdetalle')
  @Auth( /**  N Permissions */ )
  findEstudianteforparametrocalificacion( @Param('fkidgrupopensumdetalle') fkidgrupopensumdetalle: string ) {
    return this.inscripciongrupoService.findEstudianteForParametroCalificacion(+fkidgrupopensumdetalle);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createInscripciongrupoDto: CreateInscripcionGrupoDto) {
    return this.inscripciongrupoService.store(createInscripciongrupoDto);
  }

  @Get('/edit/:idinscripciongrupo')
  @Auth( /**  N Permissions */ )
  edit(@Param('idinscripciongrupo') idinscripciongrupo: string) {
    return this.inscripciongrupoService.edit(idinscripciongrupo);
  }

  @Get('/show/:idinscripciongrupo')
  @Auth( /**  N Permissions */ )
  show(@Param('idinscripciongrupo') idinscripciongrupo: string) {
    return this.inscripciongrupoService.show(idinscripciongrupo);
  }

  @Patch('/update/:idinscripciongrupo')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idinscripciongrupo') idinscripciongrupo: string, @Body() updateInscripciongrupoDto: UpdateInscripcionGrupoDto) {
    return this.inscripciongrupoService.update(idinscripciongrupo, updateInscripciongrupoDto);
  }

  @Put('/update/:idinscripciongrupo')
  @Auth( /**  N Permissions */ )
  update(@Param('idinscripciongrupo') idinscripciongrupo: string, @Body() updateInscripciongrupoDto: UpdateInscripcionGrupoDto) {
    return this.inscripciongrupoService.update(idinscripciongrupo, updateInscripciongrupoDto);
  }

  @Delete('/delete/:idinscripciongrupo')
  @Auth( /**  N Permissions */ )
  delete(@Param('idinscripciongrupo') idinscripciongrupo: string) {
    return this.inscripciongrupoService.delete(idinscripciongrupo);
  }
}
