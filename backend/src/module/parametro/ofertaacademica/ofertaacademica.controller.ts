import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OfertaAcademicaService } from './ofertaacademica.service';
import { CreateOfertaAcademicaDto } from './dto/create-ofertaacademica.dto';
import { UpdateOfertaAcademicaDto } from './dto/update-ofertaacademica.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('ofertaacademica')
export class OfertaAcademicaController {
  constructor(private readonly ofertaacademicaService: OfertaAcademicaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.ofertaacademicaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createOfertaAcademicaDto: CreateOfertaAcademicaDto) {
    return this.ofertaacademicaService.store(createOfertaAcademicaDto);
  }

  @Get('/edit/:idofertaacademica')
  @Auth( /**  N Permissions */ )
  edit(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.edit(id);
  }

  @Get('/show/:idofertaacademica')
  @Auth( /**  N Permissions */ )
  show(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.show(id);
  }

  @Put('/update/:idofertaacademica')
  @Auth( /**  N Permissions */ )
  update(@Param('idofertaacademica') id: string, @Body() updateOfertaAcademicaDto: UpdateOfertaAcademicaDto) {
    return this.ofertaacademicaService.update(id, updateOfertaAcademicaDto);
  }

  @Delete('/delete/:idofertaacademica')
  @Auth( /**  N Permissions */ )
  remove(@Param('idofertaacademica') id: string) {
    return this.ofertaacademicaService.delete(id);
  }
}
