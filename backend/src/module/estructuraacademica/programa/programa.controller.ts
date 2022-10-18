import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}

  @Get('/index')
  findAll() {
    return this.programaService.findAll();
  }

  @Post('/store')
  @HttpCode( HttpStatus.OK )
  store(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.store(createProgramaDto);
  }

  @Get('/show/:idprograma')
  show(@Param('idprograma') id: string) {
    return this.programaService.show(id);
  }

  @Get('/edit/:idprograma')
  edit(@Param('idprograma') id: string) {
    return this.programaService.edit(id);
  }

  @Patch('/update/:idprograma')
  updatePatch(@Param('idprograma') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(id, updateProgramaDto);
  }

  @Put('/update/:idprograma')
  updatePut(@Param('idprograma') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(id, updateProgramaDto);
  }

  @Delete('/delete/:idprograma')
  remove(@Param('idprograma') id: string) {
    return this.programaService.remove(id);
  }
}
