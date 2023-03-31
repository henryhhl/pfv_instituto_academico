import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotacursoService } from './notacurso.service';
import { CreateNotaCursoDto } from './dto/create-notacurso.dto';
import { UpdateNotacursoDto } from './dto/update-notacurso.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('notacurso')
export class NotacursoController {
  constructor(private readonly notacursoService: NotacursoService) {}

  @Post()
  create(@Body() createNotacursoDto: CreateNotaCursoDto) {
    return this.notacursoService.create(createNotacursoDto);
  }

  @Get()
  findAll() {
    return this.notacursoService.findAll();
  }

  @Get('/findOne/:idnotacurso')
  findOne(@Param('id') id: string) {
    return this.notacursoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotacursoDto: UpdateNotacursoDto) {
    // return this.notacursoService.update(id);
    return {};
  }

  @Put('/update')
  @Auth( /**  N Permissions */ )
  updatePut(@Body() createNotaCursoDto: CreateNotaCursoDto) {
    return this.notacursoService.update(createNotaCursoDto);
  }

  @Delete('/delete/:idnotacurso')
  remove(@Param('idnotacurso') id: string) {
    return this.notacursoService.remove(+id);
  }
}
