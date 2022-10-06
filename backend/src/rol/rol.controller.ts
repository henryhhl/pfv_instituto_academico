import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get('/index')
  findAll() {
    return this.rolService.findAll();
  }

  @Get('/create')
  create() {
    return this.rolService.findAll();
  }

  @Post('/store')
  store(@Body() createRolDto: CreateRolDto) {
    return this.rolService.store(createRolDto);
  }

  @Get('/show/:idusuario')
  showUsuario(@Param('idusuario') id: string) {
    return this.rolService.showRol(id);
  }

  @Get('/edit/:idusuario')
  editUsuario(@Param('idusuario') id: string) {
    return this.rolService.editRol(id);
  }

  @Put('/update/:idrol')
  update(@Param('idrol') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete('/delete/:idrol')
  remove(@Param('idrol') id: string) {
    return this.rolService.remove(id);
  }
}
