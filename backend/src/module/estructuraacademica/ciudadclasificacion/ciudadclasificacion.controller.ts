import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadclasificacionService } from './ciudadclasificacion.service';
import { CreateCiudadclasificacionDto } from './dto/create-ciudadclasificacion.dto';
import { UpdateCiudadclasificacionDto } from './dto/update-ciudadclasificacion.dto';

@Controller('ciudadclasificacion')
export class CiudadclasificacionController {
  constructor(private readonly ciudadclasificacionService: CiudadclasificacionService) {}

  @Post()
  create(@Body() createCiudadclasificacionDto: CreateCiudadclasificacionDto) {
    return this.ciudadclasificacionService.create(createCiudadclasificacionDto);
  }

  @Get()
  findAll() {
    return this.ciudadclasificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciudadclasificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiudadclasificacionDto: UpdateCiudadclasificacionDto) {
    return this.ciudadclasificacionService.update(+id, updateCiudadclasificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadclasificacionService.remove(+id);
  }
}
