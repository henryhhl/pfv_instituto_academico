import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TipoResultadoService } from './tiporesultado.service';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { CreateTipoResultadoDto } from './dto/create-tiporesultado.dto';
import { UpdateTipoResultadoDto } from './dto/update-tiporesultado.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tiporesultado')
export class TipoResultadoController {
  constructor(private readonly tiporesultadoService: TipoResultadoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tiporesultadoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTiporesultadoDto: CreateTipoResultadoDto) {
    return this.tiporesultadoService.store(createTiporesultadoDto);
  }

  @Get('/edit/:idtiporesultado')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtiporesultado') idtiporesultado: string) {
    return this.tiporesultadoService.edit(idtiporesultado);
  }

  @Get('/show/:idtiporesultado')
  @Auth( /**  N Permissions */ )
  show(@Param('idtiporesultado') idtiporesultado: string) {
    return this.tiporesultadoService.show(idtiporesultado);
  }

  @Patch('/update/:idtiporesultado')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idtiporesultado') idtiporesultado: string, @Body() updateTiporesultadoDto: UpdateTipoResultadoDto) {
    return this.tiporesultadoService.update(idtiporesultado, updateTiporesultadoDto);
  }

  @Put('/update/:idtiporesultado')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idtiporesultado') idtiporesultado: string, @Body() updateTiporesultadoDto: UpdateTipoResultadoDto) {
    return this.tiporesultadoService.update(idtiporesultado, updateTiporesultadoDto);
  }

  @Delete('/delete/:idtiporesultado')
  @Auth( /**  N Permissions */ )
  delete(@Param('idtiporesultado') idtiporesultado: string) {
    return this.tiporesultadoService.delete(idtiporesultado);
  }
}
