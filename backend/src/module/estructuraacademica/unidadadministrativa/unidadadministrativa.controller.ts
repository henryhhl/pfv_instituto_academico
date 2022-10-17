import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';

@Controller('unidadadministrativa')
export class UnidadadministrativaController {
  constructor(private readonly unidadadministrativaService: UnidadAdministrativaService) {}

  @Get('/index')
  findAll() {
    return this.unidadadministrativaService.findAll();
  }

  @Post('/store')
  create(@Body() createUnidadadministrativaDto: CreateUnidadAdministrativaDto) {
    return this.unidadadministrativaService.store(createUnidadadministrativaDto);
  }

  @Get('/edit/:idunidadnegocio')
  edit(@Param('idunidadnegocio') id: string) {
    return this.unidadadministrativaService.edit(id);
  }

  @Get('/show/:idunidadnegocio')
  show(@Param('idunidadnegocio') id: string) {
    return this.unidadadministrativaService.show(id);
  }

  @Patch('/update/:idunidadnegocio')
  updatePatch(@Param('idunidadnegocio') id: string, @Body() updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadadministrativaService.update(id, updateUnidadadministrativaDto);
  }

  @Put('/update/:idunidadnegocio')
  updatePut(@Param('idunidadnegocio') id: string, @Body() updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadadministrativaService.update(id, updateUnidadadministrativaDto);
  }

  @Delete('/delete/:idunidadnegocio')
  remove(@Param('idunidadnegocio') id: string) {
    return this.unidadadministrativaService.remove(id);
  }
}
