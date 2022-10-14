import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioRolDetalleService } from './usuarioroldetalle.service';
import { CreateUsuarioRolDetalleDto } from './dto/create-usuarioroldetalle.dto';
import { UpdateUsuarioroldetalleDto } from './dto/update-usuarioroldetalle.dto';

@Controller('usuarioroldetalle')
export class UsuarioRolDetalleController {
  constructor(private readonly usuarioroldetalleService: UsuarioRolDetalleService) {}

  @Get()
  findAll() {
    return this.usuarioroldetalleService.findAll();
  }

  @Get('/rol_usuario/:idusuario')
  getRol(@Param('idusuario') id: string) {
    return this.usuarioroldetalleService.rolUsuario(id);
  }

  @Post('/store')
  asignarRol(@Body() createUsuarioroldetalleDto: CreateUsuarioRolDetalleDto) {
    return this.usuarioroldetalleService.store(createUsuarioroldetalleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioroldetalleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioroldetalleDto: UpdateUsuarioroldetalleDto) {
    return this.usuarioroldetalleService.update(+id, updateUsuarioroldetalleDto);
  }

  @Delete('/delete/:idusuarioroldetalle')
  delete(@Param('idusuarioroldetalle') id: string) {
    return this.usuarioroldetalleService.delete(id);
  }
}
