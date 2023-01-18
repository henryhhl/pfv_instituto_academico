import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ParametroCalificacionService } from './parametrocalificacion.service';
import { CreateParametrocalificacionDto } from './dto/create-parametrocalificacion.dto';
import { UpdateParametrocalificacionDto } from './dto/update-parametrocalificacion.dto';

@Controller('parametrocalificacion')
export class ParametroCalificacionController {
  constructor(private readonly parametrocalificacionService: ParametroCalificacionService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll(@Query() paginationDto: PaginationDto) {
    return this.parametrocalificacionService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createParametrocalificacionDto: CreateParametrocalificacionDto) {
    return this.parametrocalificacionService.store(createParametrocalificacionDto);
  }

  @Get('/edit/:idparametrocalificacion')
  @Auth( /**  N Permissions */ )
  edit(@Param('idparametrocalificacion') idparametrocalificacion: string) {
    return this.parametrocalificacionService.edit(idparametrocalificacion);
  }

  @Get('/show/:idparametrocalificacion')
  @Auth( /**  N Permissions */ )
  show(@Param('idparametrocalificacion') idparametrocalificacion: string) {
    return this.parametrocalificacionService.show(idparametrocalificacion);
  }

  @Patch('/update/:idparametrocalificacion')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idparametrocalificacion') idparametrocalificacion: string, @Body() updateParametrocalificacionDto: UpdateParametrocalificacionDto) {
    return this.parametrocalificacionService.update(idparametrocalificacion, updateParametrocalificacionDto);
  }

  @Put('/update/:idparametrocalificacion')
  updatePut(@Param('idparametrocalificacion') idparametrocalificacion: string, @Body() updateParametrocalificacionDto: UpdateParametrocalificacionDto) {
    return this.parametrocalificacionService.update(idparametrocalificacion, updateParametrocalificacionDto);
  }

  @Delete('/delete/:idparametrocalificacion')
  @Auth( /**  N Permissions */ )
  delete(@Param('idparametrocalificacion') idparametrocalificacion: string) {
    return this.parametrocalificacionService.delete(idparametrocalificacion);
  }
}
