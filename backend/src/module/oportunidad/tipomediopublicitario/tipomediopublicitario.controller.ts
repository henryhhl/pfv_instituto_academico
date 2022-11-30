import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TipoMedioPublicitarioService } from './tipomediopublicitario.service';
import { CreateTipoMedioPublicitarioDto } from './dto/create-tipomediopublicitario.dto';
import { UpdateTipoMedioPublicitarioDto } from './dto/update-tipomediopublicitario.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tipomediopublicitario')
export class TipoMedioPublicitarioController {
  constructor(private readonly tipomediopublicitarioService: TipoMedioPublicitarioService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipomediopublicitarioService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTipomediopublicitarioDto: CreateTipoMedioPublicitarioDto) {
    return this.tipomediopublicitarioService.store(createTipomediopublicitarioDto);
  }

  @Get('/edit/:idtipomediopublicitario')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtipomediopublicitario') idtipomediopublicitario: string) {
    return this.tipomediopublicitarioService.edit(idtipomediopublicitario);
  }

  @Get('/show/:idtipomediopublicitario')
  @Auth( /**  N Permissions */ )
  show(@Param('idtipomediopublicitario') idtipomediopublicitario: string) {
    return this.tipomediopublicitarioService.show(idtipomediopublicitario);
  }

  @Patch('/update/:idtipomediopublicitario')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idtipomediopublicitario') idtipomediopublicitario: string, @Body() updateTipomediopublicitarioDto: UpdateTipoMedioPublicitarioDto) {
    return this.tipomediopublicitarioService.update(idtipomediopublicitario, updateTipomediopublicitarioDto);
  }

  @Put('/update/:idtipomediopublicitario')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idtipomediopublicitario') idtipomediopublicitario: string, @Body() updateTipomediopublicitarioDto: UpdateTipoMedioPublicitarioDto) {
    return this.tipomediopublicitarioService.update(idtipomediopublicitario, updateTipomediopublicitarioDto);
  }

  @Delete('/delete/:idtipomediopublicitario')
  @Auth( /**  N Permissions */ )
  delete(@Param('idtipomediopublicitario') idtipomediopublicitario: string) {
    return this.tipomediopublicitarioService.delete(idtipomediopublicitario);
  }
}
