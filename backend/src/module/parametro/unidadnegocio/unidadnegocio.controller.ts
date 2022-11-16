import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UnidadNegocioService } from './unidadnegocio.service';
import { CreateUnidadnegocioDto } from './dto/create-unidadnegocio.dto';
import { UpdateUnidadNegocioDto } from './dto/update-unidadnegocio.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('unidadnegocio')
export class UnidadNegocioController {
  constructor(private readonly unidadNegocioService: UnidadNegocioService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.unidadNegocioService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createUnidadnegocioDto: CreateUnidadnegocioDto) {
    return this.unidadNegocioService.store(createUnidadnegocioDto);
  }

  @Get('/edit/:idunidadnegocio')
  @Auth( /**  N Permissions */ )
  onEdit(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.edit(id);
  }

  @Get('/show/:idunidadnegocio')
  @Auth( /**  N Permissions */ )
  onShow(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.show(id);
  }

  @Put('/update/:idunidadnegocio')
  @Auth( /**  N Permissions */ )
  update(@Param('idunidadnegocio') id: string, @Body() updateUnidadnegocioDto: UpdateUnidadNegocioDto) {
    return this.unidadNegocioService.update(id, updateUnidadnegocioDto);
  }

  @Delete('/delete/:idunidadnegocio')
  @Auth( /**  N Permissions */ )
  remove(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.delete(id);
  }
}
