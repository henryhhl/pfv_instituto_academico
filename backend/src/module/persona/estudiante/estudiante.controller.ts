import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Request } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.estudianteService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Request() request,  @GetUser() user: Usuario, @Body() createEstudianteDto: CreateEstudianteDto) {
    const { ip, originalUrl, method } = request;
    return this.estudianteService.store(createEstudianteDto, { usuario: user, ip, originalUrl });
  }

  @Get('/edit/:idestudiante')
  @Auth( /**  N Permissions */ )
  edit(@Param('idestudiante') idestudiante: string) {
    return this.estudianteService.edit(idestudiante);
  }

  @Get('/show/:idestudiante')
  @Auth( /**  N Permissions */ )
  show(@Param('idestudiante') idestudiante: string) {
    return this.estudianteService.show(idestudiante);
  }

  @Patch('/update/:idestudiante')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idestudiante') idestudiante: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(idestudiante, updateEstudianteDto);
  }

  @Put('/update/:idestudiante')
  @Auth( /**  N Permissions */ )
  update(@Param('idestudiante') idestudiante: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(idestudiante, updateEstudianteDto);
  }

  @Delete('/delete/:idestudiante')
  @Auth( /**  N Permissions */ )
  delete(@Query() query, @Request() request, @GetUser() user: Usuario, @Param('idestudiante') idestudiante: string) {
    const { ip, originalUrl, method } = request;
    return this.estudianteService.delete(idestudiante, { usuario: user, ip, originalUrl, query });
  }
}
