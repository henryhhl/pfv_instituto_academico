import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Post('/store')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.store(createUsuarioDto);
  }

  @Get('/show/:idusuario')
  showUsuario(@Param('idusuario') id: string) {
    return this.usuarioService.show(id);
  }

  @Get('/edit/:idusuario')
  editUsuario(@Param('idusuario') id: string) {
    return this.usuarioService.edit(id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete('/delete/:idusuario')
  remove(@Param('idusuario') id: string) {
    return this.usuarioService.delete(id);
  }
}
