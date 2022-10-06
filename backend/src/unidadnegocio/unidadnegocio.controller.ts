import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UnidadNegocioService } from './unidadnegocio.service';
import { CreateUnidadnegocioDto } from './dto/create-unidadnegocio.dto';
import { UpdateUnidadNegocioDto } from './dto/update-unidadnegocio.dto';

@Controller('unidadnegocio')
export class UnidadNegocioController {
  constructor(private readonly unidadNegocioService: UnidadNegocioService) {}

  @Get('/index')
  findAll() {
    return this.unidadNegocioService.findAll();
  }

  @Post('/store')
  store(@Body() createUnidadnegocioDto: CreateUnidadnegocioDto) {
    return this.unidadNegocioService.store(createUnidadnegocioDto);
  }

  @Get('/edit/:idunidadnegocio')
  onEdit(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.edit(id);
  }

  @Get('/show/:idunidadnegocio')
  onShow(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.show(id);
  }

  @Put('/update/:idunidadnegocio')
  update(@Param('idunidadnegocio') id: string, @Body() updateUnidadnegocioDto: UpdateUnidadNegocioDto) {
    return this.unidadNegocioService.update(id, updateUnidadnegocioDto);
  }

  @Delete('/delete/:idunidadnegocio')
  remove(@Param('idunidadnegocio') id: string) {
    return this.unidadNegocioService.remove(id);
  }
}
