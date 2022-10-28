import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { NivelAcademicoService } from './nivelacademico.service';
import { CreateNivelAcademicoDto } from './dto/create-nivelacademico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivelacademico.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('nivelacademico')
export class NivelAcademicoController {
  constructor(private readonly nivelacademicoService: NivelAcademicoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.nivelacademicoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createNivelacademicoDto: CreateNivelAcademicoDto) {
    return this.nivelacademicoService.store(createNivelacademicoDto);
  }

  @Get('/edit/:idnivelacademico')
  edit(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.edit(id);
  }

  @Get('/show/:idnivelacademico')
  show(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.show(id);
  }

  @Put('/update/:idnivelacademico')
  update(@Param('idnivelacademico') id: string, @Body() updateNivelacademicoDto: UpdateNivelAcademicoDto) {
    return this.nivelacademicoService.update(id, updateNivelacademicoDto);
  }

  @Delete('/delete/:idnivelacademico')
  remove(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.delete(id);
  }
}
