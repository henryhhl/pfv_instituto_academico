import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.store(createUsuarioDto);
  }

  @Get('/show/:idusuario')
  @Auth( /**  N Permissions */ )
  showUsuario(@Param('idusuario') idusuario: string) {
    return this.usuarioService.show(idusuario);
  }

  @Get('/edit/:idusuario')
  @Auth( /**  N Permissions */ )
  editUsuario(@Param('idusuario') idusuario: string) {
    return this.usuarioService.edit(idusuario);
  }

  @Put('/update/:idusuario')
  @Auth( /**  N Permissions */ )
  update(@Param('idusuario') idusuario: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(idusuario, updateUsuarioDto);
  }

  @Delete('/delete/:idusuario')
  @Auth( /**  N Permissions */ )
  remove(@Param('idusuario') idusuario: string) {
    return this.usuarioService.delete(idusuario);
  }
}
