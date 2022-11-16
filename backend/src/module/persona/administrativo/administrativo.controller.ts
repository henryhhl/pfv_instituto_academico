import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AdministrativoService } from './administrativo.service';
import { CreateAdministrativoDto } from './dto/create-administrativo.dto';
import { UpdateAdministrativoDto } from './dto/update-administrativo.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('administrativo')
export class AdministrativoController {
  constructor(private readonly administrativoService: AdministrativoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.administrativoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createAdministrativoDto: CreateAdministrativoDto) {
    return this.administrativoService.store(createAdministrativoDto);
  }

  @Get('/edit/:idadministrativo')
  @Auth( /**  N Permissions */ )
  edit(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.edit(idadministrativo);
  }

  @Get('/show/:idadministrativo')
  @Auth( /**  N Permissions */ )
  show(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.show(idadministrativo);
  }

  @Patch('/update/:idadministrativo')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idadministrativo') idadministrativo: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(idadministrativo, updateAdministrativoDto);
  }

  @Put('/update/:idadministrativo')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idadministrativo') idadministrativo: string, @Body() updateAdministrativoDto: UpdateAdministrativoDto) {
    return this.administrativoService.update(idadministrativo, updateAdministrativoDto);
  }

  @Delete('/delete/:idadministrativo')
  @Auth( /**  N Permissions */ )
  delete(@Param('idadministrativo') idadministrativo: string) {
    return this.administrativoService.delete(idadministrativo);
  }
}
