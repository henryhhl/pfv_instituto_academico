import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TipoCiudadService } from './tipociudad.service';
import { CreateTipoCiudadDto } from './dto/create-tipociudad.dto';
import { UpdateTipoCiudadDto } from './dto/update-tipociudad.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tipociudad')
export class TipoCiudadController {
  constructor(private readonly tipociudadService: TipoCiudadService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipociudadService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createTipociudadDto: CreateTipoCiudadDto) {
    return this.tipociudadService.store(createTipociudadDto);
  }

  @Get('/edit/:idtipociudad')
  edit(@Param('idtipociudad') id: string) {
    return this.tipociudadService.edit(id);
  }

  @Get('/show/:idtipociudad')
  show(@Param('idtipociudad') id: string) {
    return this.tipociudadService.show(id);
  }

  @Patch('/update/:idtipociudad')
  updatePatch(@Param('idtipociudad') id: string, @Body() updateTipociudadDto: UpdateTipoCiudadDto) {
    return this.tipociudadService.update(id, updateTipociudadDto);
  }

  @Put('/update/:idtipociudad')
  updatePut(@Param('idtipociudad') id: string, @Body() updateTipociudadDto: UpdateTipoCiudadDto) {
    return this.tipociudadService.update(id, updateTipociudadDto);
  }

  @Delete('/delete/:idtipociudad')
  delete(@Param('idtipociudad') id: string) {
    return this.tipociudadService.delete(id);
  }
}
