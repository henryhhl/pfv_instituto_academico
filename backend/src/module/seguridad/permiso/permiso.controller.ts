import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll() {
    return this.permisoService.findAll();
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisoService.store(createPermisoDto);
  }

  @Get('/edit/:idpermiso')
  @Auth( /**  N Permissions */ )
  edit(@Param('idpermiso') id: string) {
    return this.permisoService.edit(id);
  }

  @Get('/show/:idpermiso')
  @Auth( /**  N Permissions */ )
  show(@Param('idpermiso') id: string) {
    return this.permisoService.show(id);
  }

  @Patch('/update/:idpermiso')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idpermiso') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(id, updatePermisoDto);
  }

  @Put('/update/:idpermiso')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idpermiso') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(id, updatePermisoDto);
  }

  @Delete('/delete/:idpermiso')
  @Auth( /**  N Permissions */ )
  remove(@Param('idpermiso') id: string) {
    return this.permisoService.remove(id);
  }
}
