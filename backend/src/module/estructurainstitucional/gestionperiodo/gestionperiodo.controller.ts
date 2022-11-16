import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { GestionPeriodoService } from './gestionperiodo.service';
import { CreateGestionPeriodoDto } from './dto/create-gestionperiodo.dto';
import { UpdateGestionPeriodoDto } from './dto/update-gestionperiodo.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('gestionperiodo')
export class GestionPeriodoController {
  constructor(private readonly gestionperiodoService: GestionPeriodoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.gestionperiodoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createGestionperiodoDto: CreateGestionPeriodoDto) {
    return this.gestionperiodoService.store(createGestionperiodoDto);
  }

  @Get('/edit/:idgestionperiodo')
  @Auth( /**  N Permissions */ )
  edit(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.edit(idgestionperiodo);
  }

  @Get('/show/:idgestionperiodo')
  @Auth( /**  N Permissions */ )
  show(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.show(idgestionperiodo);
  }

  @Patch('/update/:idgestionperiodo')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idgestionperiodo') idgestionperiodo: string, @Body() updateGestionperiodoDto: UpdateGestionPeriodoDto) {
    return this.gestionperiodoService.update(idgestionperiodo, updateGestionperiodoDto);
  }

  @Put('/update/:idgestionperiodo')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idgestionperiodo') idgestionperiodo: string, @Body() updateGestionperiodoDto: UpdateGestionPeriodoDto) {
    return this.gestionperiodoService.update(idgestionperiodo, updateGestionperiodoDto);
  }

  @Delete(':idgestionperiodo')
  @Auth( /**  N Permissions */ )
  delete(@Param('idgestionperiodo') idgestionperiodo: string) {
    return this.gestionperiodoService.delete(idgestionperiodo);
  }
}
