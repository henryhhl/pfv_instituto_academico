import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.turnoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnoService.store(createTurnoDto);
  }

  @Get('/edit/:idturno')
  edit(@Param('idturno') idturno: string) {
    return this.turnoService.edit(idturno);
  }

  @Get('/show/:idturno')
  show(@Param('idturno') idturno: string) {
    return this.turnoService.show(idturno);
  }

  @Patch('/update/:idturno')
  updatePatch(@Param('idturno') idturno: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnoService.update(idturno, updateTurnoDto);
  }

  @Put('/update/:idturno')
  updatePut(@Param('idturno') idturno: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnoService.update(idturno, updateTurnoDto);
  }

  @Delete('/delete/:idturno')
  delete(@Param('idturno') idturno: string) {
    return this.turnoService.delete(idturno);
  }
}
