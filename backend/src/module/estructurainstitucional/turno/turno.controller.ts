import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.turnoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnoService.store(createTurnoDto);
  }

  @Get('/edit/:idturno')
  @Auth( /**  N Permissions */ )
  edit(@Param('idturno') idturno: string) {
    return this.turnoService.edit(idturno);
  }

  @Get('/show/:idturno')
  @Auth( /**  N Permissions */ )
  show(@Param('idturno') idturno: string) {
    return this.turnoService.show(idturno);
  }

  @Patch('/update/:idturno')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idturno') idturno: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnoService.update(idturno, updateTurnoDto);
  }

  @Put('/update/:idturno')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idturno') idturno: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnoService.update(idturno, updateTurnoDto);
  }

  @Delete('/delete/:idturno')
  @Auth( /**  N Permissions */ )
  delete(@Param('idturno') idturno: string) {
    return this.turnoService.delete(idturno);
  }
}
