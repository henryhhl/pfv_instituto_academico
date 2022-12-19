import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscripciongrupoService } from './inscripciongrupo.service';
import { CreateInscripciongrupoDto } from './dto/create-inscripciongrupo.dto';
import { UpdateInscripciongrupoDto } from './dto/update-inscripciongrupo.dto';

@Controller('inscripciongrupo')
export class InscripciongrupoController {
  constructor(private readonly inscripciongrupoService: InscripciongrupoService) {}

  @Post()
  create(@Body() createInscripciongrupoDto: CreateInscripciongrupoDto) {
    return this.inscripciongrupoService.create(createInscripciongrupoDto);
  }

  @Get()
  findAll() {
    return this.inscripciongrupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscripciongrupoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscripciongrupoDto: UpdateInscripciongrupoDto) {
    return this.inscripciongrupoService.update(+id, updateInscripciongrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscripciongrupoService.remove(+id);
  }
}
