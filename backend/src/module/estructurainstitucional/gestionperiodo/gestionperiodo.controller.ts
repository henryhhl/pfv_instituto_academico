import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { GestionPeriodoService } from './gestionperiodo.service';
import { CreateGestionPeriodoDto } from './dto/create-gestionperiodo.dto';
import { UpdateGestionPeriodoDto } from './dto/update-gestionperiodo.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('gestionperiodo')
export class GestionPeriodoController {
  constructor(private readonly gestionperiodoService: GestionPeriodoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.gestionperiodoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createGestionperiodoDto: CreateGestionPeriodoDto) {
    return this.gestionperiodoService.store(createGestionperiodoDto);
  }

  @Get('/edit/:idgestionperiodo')
  edit(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.edit(idgestionperiodo);
  }

  @Get('/show/:idgestionperiodo')
  show(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.show(idgestionperiodo);
  }

  @Patch('/update/:idgestionperiodo')
  updatePatch(@Param('idgestionperiodo') idgestionperiodo: string, @Body() updateGestionperiodoDto: UpdateGestionPeriodoDto) {
    return this.gestionperiodoService.update(idgestionperiodo, updateGestionperiodoDto);
  }

  @Put('/update/:idgestionperiodo')
  updatePut(@Param('idgestionperiodo') idgestionperiodo: string, @Body() updateGestionperiodoDto: UpdateGestionPeriodoDto) {
    return this.gestionperiodoService.update(idgestionperiodo, updateGestionperiodoDto);
  }

  @Delete(':idgestionperiodo')
  delete(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.delete(idgestionperiodo);
  }
}
