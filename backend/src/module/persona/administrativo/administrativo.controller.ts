import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';

@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.administrativoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.store(createAdministrativoDto);
  }

  @Get('/edit/:idadministrativo')
  edit(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.edit(idadministrativo);
  }

  @Get('/show/:idadministrativo')
  show(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.show(idadministrativo);
  }

  @Patch('/update/:idadministrativo')
  updatePatch(@Param('idadministrativo') idadministrativo: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(idadministrativo, updateAdministrativoDto);
  }

  @Put('/update/:idadministrativo')
  updatePut(@Param('idadministrativo') idadministrativo: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(idadministrativo, updateAdministrativoDto);
  }

  @Delete('/delete/:idadministrativo')
  delete(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.delete(idadministrativo);
  }
}
