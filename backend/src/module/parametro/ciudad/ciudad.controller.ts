import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('/index')
  findAll() {
    return this.ciudadService.findAll();
  }

  @Post('/store')
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.store(createCiudadDto);
  }

  @Get('/edit/:idciudad')
  edit(@Param('idciudad') id: string) {
    return this.ciudadService.edit(id);
  }

  @Get('/show/:idciudad')
  show(@Param('idciudad') id: string) {
    return this.ciudadService.show(id);
  }

  @Patch('/update/:idciudad')
  updatePatch(@Param('idciudad') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Put('/update/:idciudad')
  updatePut(@Param('idciudad') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete('/delete/:idciudad')
  remove(@Param('idciudad') id: string) {
    return this.ciudadService.delete(id);
  }
}
