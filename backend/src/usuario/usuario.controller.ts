import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/index')
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post('/store')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get('/show/:idusuario')
  showUsuario(@Param('idusuario') id: string) {
    return this.usuarioService.showUsuario(id);
  }

  @Get('/edit/:idusuario')
  editUsuario(@Param('idusuario') id: string) {
    return this.usuarioService.editUsuario(id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete('/delete/:idusuario')
  remove(@Param('idusuario') id: string) {
    return this.usuarioService.remove(id);
  }
}
