import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ModalidadAcademicaService } from './modalidadacademica.service';
import { CreateModalidadAcademicaDto } from './dto/create-modalidadacademica.dto';
import { UpdateModalidadAcademicaDto } from './dto/update-modalidadacademica.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('modalidadacademica')
export class ModalidadAcademicaController {
  constructor(private readonly modalidadacademicaService: ModalidadAcademicaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.modalidadacademicaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createModalidadAcademicaDto: CreateModalidadAcademicaDto) {
    return this.modalidadacademicaService.store(createModalidadAcademicaDto);
  }

  @Get('/edit/:idmodalidadacademica')
  @Auth( /**  N Permissions */ )
  edit(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.edit(id);
  }

  @Get('/show/:idmodalidadacademica')
  @Auth( /**  N Permissions */ )
  show(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.show(id);
  }

  @Put('/update/:idmodalidadacademica')
  @Auth( /**  N Permissions */ )
  update(@Param('idmodalidadacademica') id: string, @Body() updateModalidadAcademicaDto: UpdateModalidadAcademicaDto) {
    return this.modalidadacademicaService.update(id, updateModalidadAcademicaDto);
  }

  @Delete('/delete/:idmodalidadacademica')
  @Auth( /**  N Permissions */ )
  delete(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.delete(id);
  }
}
