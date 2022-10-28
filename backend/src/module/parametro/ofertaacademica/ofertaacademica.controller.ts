import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OfertaAcademicaService } from './ofertaacademica.service';
import { CreateOfertaAcademicaDto } from './dto/create-ofertaacademica.dto';
import { UpdateOfertaAcademicaDto } from './dto/update-ofertaacademica.dto';

@Controller('ofertaacademica')
export class OfertaAcademicaController {
  constructor(private readonly ofertaacademicaService: OfertaAcademicaService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.ofertaacademicaService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createOfertaAcademicaDto: CreateOfertaAcademicaDto) {
    return this.ofertaacademicaService.store(createOfertaAcademicaDto);
  }

  @Get('/edit/:idofertaacademica')
  edit(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.edit(id);
  }

  @Get('/show/:idofertaacademica')
  show(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.show(id);
  }

  @Put('/update/:idofertaacademica')
  update(@Param('idofertaacademica') id: string, @Body() updateOfertaAcademicaDto: UpdateOfertaAcademicaDto) {
    return this.ofertaacademicaService.update(id, updateOfertaAcademicaDto);
  }

  @Delete('/delete/:idofertaacademica')
  remove(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.delete(id);
  }
}
