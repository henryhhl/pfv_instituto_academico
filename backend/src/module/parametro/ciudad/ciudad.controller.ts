import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll() {
    return this.ciudadService.findAll();
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.store(createCiudadDto);
  }

  @Get('/edit/:idciudad')
  @Auth( /**  N Permissions */ )
  edit(@Param('idciudad') id: string) {
    return this.ciudadService.edit(id);
  }

  @Get('/show/:idciudad')
  @Auth( /**  N Permissions */ )
  show(@Param('idciudad') id: string) {
    return this.ciudadService.show(id);
  }

  @Patch('/update/:idciudad')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idciudad') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Put('/update/:idciudad')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idciudad') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete('/delete/:idciudad')
  @Auth( /**  N Permissions */ )
  remove(@Param('idciudad') id: string) {
    return this.ciudadService.delete(id);
  }
}
