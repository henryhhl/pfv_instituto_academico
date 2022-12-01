import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EstadoNegocioService } from './estadonegocio.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateEstadoNegocioDto } from './dto/create-estadonegocio.dto';
import { UpdateEstadoNegocioDto } from './dto/update-estadonegocio.dto';

@Controller('estadonegocio')
export class EstadoNegocioController {
  constructor(private readonly estadonegocioService: EstadoNegocioService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.estadonegocioService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createEstadonegocioDto: CreateEstadoNegocioDto) {
    return this.estadonegocioService.store(createEstadonegocioDto);
  }

  @Get('/edit/:idestadonegocio')
  @Auth( /**  N Permissions */ )
  edit(@Param('idestadonegocio') idestadonegocio: string) {
    return this.estadonegocioService.edit(idestadonegocio);
  }

  @Get('/show/:idestadonegocio')
  @Auth( /**  N Permissions */ )
  show(@Param('idestadonegocio') idestadonegocio: string) {
    return this.estadonegocioService.show(idestadonegocio);
  }

  @Patch('/update/:idestadonegocio')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idestadonegocio') idestadonegocio: string, @Body() updateEstadonegocioDto: UpdateEstadoNegocioDto) {
    return this.estadonegocioService.update(idestadonegocio, updateEstadonegocioDto);
  }

  @Put('/update/:idestadonegocio')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idestadonegocio') idestadonegocio: string, @Body() updateEstadonegocioDto: UpdateEstadoNegocioDto) {
    return this.estadonegocioService.update(idestadonegocio, updateEstadonegocioDto);
  }

  @Delete('/delete/:idestadonegocio')
  @Auth( /**  N Permissions */ )
  delete(@Param('idestadonegocio') idestadonegocio: string) {
    return this.estadonegocioService.delete(idestadonegocio);
  }
}
