import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Ip, HostParam, Request } from '@nestjs/common';
import { TipoIdentificacionService } from './tipoidentificacion.service';
import { CreateTipoIdentificacionDto } from './dto/create-tipoidentificacion.dto';
import { UpdateTipoIdentificacionDto } from './dto/update-tipoidentificacion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@Controller('tipoidentificacion')
export class TipoIdentificacionController {
  constructor(private readonly tipoidentificacionService: TipoIdentificacionService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipoidentificacionService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store( @Ip() ipHost,  @GetUser() user: Usuario, @Body() createTipoIdentificacionDto: CreateTipoIdentificacionDto ) {
    return this.tipoidentificacionService.store(createTipoIdentificacionDto, ipHost, user);
  }

  @Get('/edit/:idtipoidentificacion')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.edit(idtipoidentificacion);
  }

  @Get('/show/:idtipoidentificacion')
  @Auth( /**  N Permissions */ )
  show(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.show(idtipoidentificacion);
  }

  @Patch('/update/:idtipoidentificacion')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idtipoidentificacion') idtipoidentificacion: string, @Body() updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    return this.tipoidentificacionService.update(idtipoidentificacion, updateTipoidentificacionDto);
  }

  @Put('/update/:idtipoidentificacion')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idtipoidentificacion') idtipoidentificacion: string, @Body() updateTipoidentificacionDto: UpdateTipoIdentificacionDto) {
    return this.tipoidentificacionService.update(idtipoidentificacion, updateTipoidentificacionDto);
  }

  @Delete('/delete/:idtipoidentificacion')
  @Auth( /**  N Permissions */ )
  delete(@Param('idtipoidentificacion') idtipoidentificacion: string) {
    return this.tipoidentificacionService.delete(idtipoidentificacion);
  }
}
