import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { StoreActividadDto } from './dto/store-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.actividadService.findAll(paginationDto);
  }

  @Get('/create')
  @Auth( /**  N Permissions */ )
  create( @Query() createActividadDto: CreateActividadDto ) {
    return this.actividadService.create(createActividadDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createActividadDto: StoreActividadDto) {
    return this.actividadService.store(createActividadDto);
  }

  @Get('/edit/:idactividad')
  @Auth( /**  N Permissions */ )
  edit(@Param('idactividad') idactividad: string) {
    return this.actividadService.edit(idactividad);
  }

  @Get('/show/:idactividad')
  @Auth( /**  N Permissions */ )
  show(@Param('idactividad') idactividad: string) {
    return this.actividadService.show(idactividad);
  }

  @Patch('/update/:idactividad')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idactividad') idactividad: string, @Body() updateActividadDto: UpdateActividadDto) {
    return this.actividadService.update(idactividad, updateActividadDto);
  }

  @Put('/update/:idactividad')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idactividad') idactividad: string, @Body() updateActividadDto: UpdateActividadDto) {
    return this.actividadService.update(idactividad, updateActividadDto);
  }

  @Delete('/delete/:idactividad')
  @Auth( /**  N Permissions */ )
  delete(@Param('idactividad') idactividad: string) {
    return this.actividadService.delete(idactividad);
  }
}
