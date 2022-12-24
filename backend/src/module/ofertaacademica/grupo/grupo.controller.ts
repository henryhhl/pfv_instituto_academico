import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { PaginationGrupoPensumDto } from './dto/grupopensum-pagination.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.grupoService.findAll(paginationDto);
  }

  @Get('/findgrupoforpensum')
  @Auth( /**  N Permissions */ )
  grupopensum( @Query() paginationDto: PaginationGrupoPensumDto ) {
    return this.grupoService.findAllGrupoForPensum(paginationDto);
  }

  @Get('/findmateriaforgrupo')
  @Auth( /**  N Permissions */ )
  materiagrupo( @Query() paginationDto: PaginationGrupoPensumDto ) {
    return this.grupoService.findAllMateriaForGrupo(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.store(createGrupoDto);
  }

  @Get('/edit/:idgrupo')
  @Auth( /**  N Permissions */ )
  edit(@Param('idgrupo') idgrupo: string) {
    return this.grupoService.edit(idgrupo);
  }

  @Get('/show/:idgrupo')
  @Auth( /**  N Permissions */ )
  show(@Param('idgrupo') idgrupo: string) {
    return this.grupoService.show(idgrupo);
  }

  @Patch('/update/:idgrupo')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idgrupo') idgrupo: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(idgrupo, updateGrupoDto);
  }

  @Put('/update/:idgrupo')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idgrupo') idgrupo: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(idgrupo, updateGrupoDto);
  }

  @Delete('/delete/:idgrupo')
  @Auth( /**  N Permissions */ )
  delete(@Param('idgrupo') idgrupo: string) {
    return this.grupoService.delete(idgrupo);
  }
}
