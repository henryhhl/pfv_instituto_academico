import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Request } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { PaginationCalendarioAcademicoDto } from './dto/pagination.dto';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';
import { CalendarioAcademicoService } from './calendarioacademico.service';
import { CreateCalendarioAcademicoDto } from './dto/create-calendarioacademico.dto';
import { UpdateCalendarioAcademicoDto } from './dto/update-calendarioacademico.dto';

@Controller('calendarioacademico')
export class CalendarioAcademicoController {
  constructor(private readonly calendarioacademicoService: CalendarioAcademicoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll(@Query() paginationDto: PaginationCalendarioAcademicoDto) {
    return this.calendarioacademicoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Request() request,  @GetUser() usuario: Usuario, @Body() createCalendarioacademicoDto: CreateCalendarioAcademicoDto) {
    return this.calendarioacademicoService.store(createCalendarioacademicoDto, { usuario, request });
  }

  @Get('/edit/:idcalendarioacademico')
  @Auth( /**  N Permissions */ )
  edit(@Param('idcalendarioacademico') idcalendarioacademico: string) {
    return this.calendarioacademicoService.edit(idcalendarioacademico);
  }

  @Get('/show/:idcalendarioacademico')
  @Auth( /**  N Permissions */ )
  show(@Param('idcalendarioacademico') idcalendarioacademico: string) {
    return this.calendarioacademicoService.show(idcalendarioacademico);
  }

  @Patch('/update/:idcalendarioacademico')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idcalendarioacademico') idcalendarioacademico: string, @Body() updateCalendarioacademicoDto: UpdateCalendarioAcademicoDto) {
    return this.calendarioacademicoService.update(idcalendarioacademico, updateCalendarioacademicoDto);
  }

  @Put('/update/:idcalendarioacademico')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idcalendarioacademico') idcalendarioacademico: string, @Body() updateCalendarioacademicoDto: UpdateCalendarioAcademicoDto) {
    return this.calendarioacademicoService.update(idcalendarioacademico, updateCalendarioacademicoDto);
  }

  @Delete('/delete/:idcalendarioacademico')
  @Auth( /**  N Permissions */ )
  delete(@Request() request,  @GetUser() usuario: Usuario, @Param('idcalendarioacademico') idcalendarioacademico: string) {
    return this.calendarioacademicoService.delete(idcalendarioacademico, { usuario, request });
  }
}
