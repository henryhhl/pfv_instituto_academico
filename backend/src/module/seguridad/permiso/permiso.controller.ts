import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Get('/index')
  findAll() {
    return this.permisoService.findAll();
  }

  @Post('/store')
  store(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisoService.store(createPermisoDto);
  }

  @Get('/edit/:idpermiso')
  edit(@Param('idpermiso') id: string) {
    return this.permisoService.edit(id);
  }

  @Get('/show/:idpermiso')
  show(@Param('idpermiso') id: string) {
    return this.permisoService.show(id);
  }

  @Patch('/update/:idpermiso')
  updatePatch(@Param('idpermiso') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(id, updatePermisoDto);
  }

  @Put('/update/:idpermiso')
  updatePut(@Param('idpermiso') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(id, updatePermisoDto);
  }

  @Delete('/delete/:idpermiso')
  remove(@Param('idpermiso') id: string) {
    return this.permisoService.remove(id);
  }
}
