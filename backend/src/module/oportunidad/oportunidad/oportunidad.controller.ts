import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { OportunidadService } from './oportunidad.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateOportunidadDto } from './dto/create-oportunidad.dto';
import { UpdateOportunidadDto } from './dto/update-oportunidad.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('oportunidad')
export class OportunidadController {
  constructor(private readonly oportunidadService: OportunidadService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.oportunidadService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createOportunidadDto: CreateOportunidadDto) {
    return this.oportunidadService.store(createOportunidadDto);
  }

  @Get('/edit/:idoportunidad')
  @Auth( /**  N Permissions */ )
  edit(@Param('idoportunidad') idoportunidad: string) {
    return this.oportunidadService.edit(idoportunidad);
  }

  @Get('/show/:idoportunidad')
  @Auth( /**  N Permissions */ )
  show(@Param('idoportunidad') idoportunidad: string) {
    return this.oportunidadService.show(idoportunidad);
  }

  @Patch('/update/:idoportunidad')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idoportunidad') idoportunidad: string, @Body() updateOportunidadDto: UpdateOportunidadDto) {
    return this.oportunidadService.update(idoportunidad, updateOportunidadDto);
  }

  @Put('/update/:idoportunidad')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idoportunidad') idoportunidad: string, @Body() updateOportunidadDto: UpdateOportunidadDto) {
    return this.oportunidadService.update(idoportunidad, updateOportunidadDto);
  }

  @Delete('/delete/:idoportunidad')
  @Auth( /**  N Permissions */ )
  delete(@Param('idoportunidad') idoportunidad: string) {
    return this.oportunidadService.delete(idoportunidad);
  }
}
