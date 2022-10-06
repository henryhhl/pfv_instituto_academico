import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OfertaAcademicaService } from './ofertaacademica.service';
import { CreateOfertaAcademicaDto } from './dto/create-ofertaacademica.dto';
import { UpdateOfertaAcademicaDto } from './dto/update-ofertaacademica.dto';

@Controller('ofertaacademica')
export class OfertaAcademicaController {
  constructor(private readonly ofertaacademicaService: OfertaAcademicaService) {}

  @Get('/index')
  findAll() {
    return this.ofertaacademicaService.findAll();
  }

  @Post('/store')
  store(@Body() createOfertaAcademicaDto: CreateOfertaAcademicaDto) {
    return this.ofertaacademicaService.store(createOfertaAcademicaDto);
  }

  @Get('/edit/:idofertaacademica')
  edit(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.findOne(id);
  }

  @Get('/show/:idofertaacademica')
  show(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.findOne(id);
  }

  @Put('/update/:idofertaacademica')
  update(@Param('idofertaacademica') id: string, @Body() updateOfertaAcademicaDto: UpdateOfertaAcademicaDto) {
    return this.ofertaacademicaService.update(id, updateOfertaAcademicaDto);
  }

  @Delete('/delete/:idofertaacademica')
  remove(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.remove(id);
  }
}
