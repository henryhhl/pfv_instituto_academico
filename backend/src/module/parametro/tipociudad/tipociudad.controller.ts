import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TipoCiudadService } from './tipociudad.service';
import { CreateTipoCiudadDto } from './dto/create-tipociudad.dto';
import { UpdateTipoCiudadDto } from './dto/update-tipociudad.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tipociudad')
export class TipoCiudadController {
  constructor(private readonly tipociudadService: TipoCiudadService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipociudadService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTipociudadDto: CreateTipoCiudadDto) {
    return this.tipociudadService.store(createTipociudadDto);
  }

  @Get('/edit/:idtipociudad')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtipociudad') id: string) {
    return this.tipociudadService.edit(id);
  }

  @Get('/show/:idtipociudad')
  @Auth( /**  N Permissions */ )
  show(@Param('idtipociudad') id: string) {
    return this.tipociudadService.show(id);
  }

  @Patch('/update/:idtipociudad')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idtipociudad') id: string, @Body() updateTipociudadDto: UpdateTipoCiudadDto) {
    return this.tipociudadService.update(id, updateTipociudadDto);
  }

  @Put('/update/:idtipociudad')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idtipociudad') id: string, @Body() updateTipociudadDto: UpdateTipoCiudadDto) {
    return this.tipociudadService.update(id, updateTipociudadDto);
  }

  @Delete('/delete/:idtipociudad')
  @Auth( /**  N Permissions */ )
  delete(@Param('idtipociudad') id: string) {
    return this.tipociudadService.delete(id);
  }
}
