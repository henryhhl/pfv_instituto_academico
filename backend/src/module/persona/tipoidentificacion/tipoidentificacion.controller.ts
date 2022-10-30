import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TipoIdentificacionService } from './tipoidentificacion.service';
import { CreateTipoIdentificacionDto } from './dto/create-tipoidentificacion.dto';
import { UpdateTipoIdentificacionDto } from './dto/update-tipoidentificacion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('tipoidentificacion')
export class TipoIdentificacionController {
  constructor(private readonly tipoidentificacionService: TipoIdentificacionService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipoidentificacionService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createTipoIdentificacionDto: CreateTipoIdentificacionDto) {
    return this.tipoidentificacionService.store(createTipoIdentificacionDto);
  }

  @Get('/edit/:idtipoidentificacion')
  edit(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.edit(idtipoidentificacion);
  }

  @Get('/show/:idtipoidentificacion')
  show(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.show(idtipoidentificacion);
  }

  @Patch('/update/:idtipoidentificacion')
  updatePatch(@Param('idtipoidentificacion') idtipoidentificacion: string, @Body() updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    return this.tipoidentificacionService.update(idtipoidentificacion, updateTipoidentificacionDto);
  }

  @Put('/update/:idtipoidentificacion')
  updatePut(@Param('idtipoidentificacion') idtipoidentificacion: string, @Body() updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    return this.tipoidentificacionService.update(idtipoidentificacion, updateTipoidentificacionDto);
  }

  @Delete('/delete/:idtipoidentificacion')
  delete(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.delete(idtipoidentificacion);
  }
}
