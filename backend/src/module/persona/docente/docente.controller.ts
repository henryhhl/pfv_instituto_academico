import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.docenteService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.store(createDocenteDto);
  }

  @Get('/edit/:iddocente')
  edit(@Param('iddocente') iddocente: string) {
    return this.docenteService.edit(iddocente);
  }

  @Get('/show/:iddocente')
  show(@Param('iddocente') iddocente: string) {
    return this.docenteService.show(iddocente);
  }

  @Patch('/update/:iddocente')
  updatePatch(@Param('iddocente') iddocente: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(iddocente, updateDocenteDto);
  }

  @Put('/update/:iddocente')
  updatePut(@Param('iddocente') iddocente: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(iddocente, updateDocenteDto);
  }

  @Delete(':iddocente')
  delete(@Param('iddocente') iddocente: string) {
    return this.docenteService.delete(iddocente);
  }
}
