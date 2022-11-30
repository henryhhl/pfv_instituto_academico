import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { TipoActividadService } from './tipoactividad.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateTipoActividadDto } from './dto/create-tipoactividad.dto';
import { UpdateTipoActividadDto } from './dto/update-tipoactividad.dto';

@Controller('tipoactividad')
export class TipoActividadController {
  constructor(private readonly tipoactividadService: TipoActividadService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipoactividadService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTipoactividadDto: CreateTipoActividadDto) {
    return this.tipoactividadService.store(createTipoactividadDto);
  }

  @Get('/edit/:idtipoactividad')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtipoactividad') idtipoactividad: string) {
    return this.tipoactividadService.edit(idtipoactividad);
  }

  @Get('/show/:idtipoactividad')
  @Auth( /**  N Permissions */ )
  show(@Param('idtipoactividad') idtipoactividad: string) {
    return this.tipoactividadService.show(idtipoactividad);
  }

  @Patch('/update/:idtipoactividad')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idtipoactividad') idtipoactividad: string, @Body() updateTipoactividadDto: UpdateTipoActividadDto) {
    return this.tipoactividadService.update(idtipoactividad, updateTipoactividadDto);
  }

  @Put('/update/:idtipoactividad')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idtipoactividad') idtipoactividad: string, @Body() updateTipoactividadDto: UpdateTipoActividadDto) {
    return this.tipoactividadService.update(idtipoactividad, updateTipoactividadDto);
  }

  @Delete('/delete/:idtipoactividad')
  @Auth( /**  N Permissions */ )
  delete(@Param('idtipoactividad') idtipoactividad: string) {
    return this.tipoactividadService.delete(idtipoactividad);
  }
}
