import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Request } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';

@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.docenteService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Request() request,  @GetUser() user: Usuario, @Body() createDocenteDto: CreateDocenteDto) {
    const { ip, originalUrl, method } = request;
    return this.docenteService.store(createDocenteDto, { usuario: user, ip, originalUrl });
  }

  @Get('/edit/:iddocente')
  @Auth( /**  N Permissions */ )
  edit(@Param('iddocente') iddocente: string) {
    return this.docenteService.edit(iddocente);
  }

  @Get('/show/:iddocente')
  @Auth( /**  N Permissions */ )
  show(@Param('iddocente') iddocente: string) {
    return this.docenteService.show(iddocente);
  }

  @Patch('/update/:iddocente')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('iddocente') iddocente: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(iddocente, updateDocenteDto);
  }

  @Put('/update/:iddocente')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('iddocente') iddocente: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(iddocente, updateDocenteDto);
  }

  @Delete('/delete/:iddocente')
  @Auth( /**  N Permissions */ )
  delete(@Query() query, @Request() request, @GetUser() user: Usuario, @Param('iddocente') iddocente: string) {
    const { ip, originalUrl, method } = request;
    return this.docenteService.delete(iddocente, { usuario: user, ip, originalUrl, query });
  }
}
