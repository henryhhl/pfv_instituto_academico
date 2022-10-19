import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModalidadAcademicaService } from './modalidadacademica.service';
import { CreateModalidadAcademicaDto } from './dto/create-modalidadacademica.dto';
import { UpdateModalidadAcademicaDto } from './dto/update-modalidadacademica.dto';

@Controller('modalidadacademica')
export class ModalidadAcademicaController {
  constructor(private readonly modalidadacademicaService: ModalidadAcademicaService) {}

  @Get('/index')
  findAll() {
    return this.modalidadacademicaService.findAll();
  }

  @Post('/store')
  store(@Body() createModalidadAcademicaDto: CreateModalidadAcademicaDto) {
    return this.modalidadacademicaService.store(createModalidadAcademicaDto);
  }

  @Get('/edit/:idmodalidadacademica')
  edit(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.edit(id);
  }

  @Get('/show/:idmodalidadacademica')
  show(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.show(id);
  }

  @Put('/update/:idmodalidadacademica')
  update(@Param('idmodalidadacademica') id: string, @Body() updateModalidadAcademicaDto: UpdateModalidadAcademicaDto) {
    return this.modalidadacademicaService.update(id, updateModalidadAcademicaDto);
  }

  @Delete('/delete/:idmodalidadacademica')
  remove(@Param('idmodalidadacademica') id: string) {
    return this.modalidadacademicaService.remove(id);
  }
}
