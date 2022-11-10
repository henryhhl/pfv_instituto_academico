import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('unidadadministrativa')
export class UnidadAdministrativaController {
  constructor(private readonly unidadAdministrativaService: UnidadAdministrativaService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.unidadAdministrativaService.findAll(paginationDto);
  }

  @Post('/store')
  create(@Body() createUnidadAdministrativaDto: CreateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.store(createUnidadAdministrativaDto);
  }

  @Get('/edit/:idunidadadministrativa')
  edit(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.edit(idunidadadministrativa);
  }

  @Get('/show/:idunidadadministrativa')
  show(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.show(idunidadadministrativa);
  }

  @Patch('/update/:idunidadadministrativa')
  updatePatch(@Param('idunidadadministrativa') idunidadadministrativa: string, @Body() updateUnidadAdministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(idunidadadministrativa, updateUnidadAdministrativaDto);
  }

  @Put('/update/:idunidadadministrativa')
  updatePut(@Param('idunidadadministrativa') idunidadadministrativa: string, @Body() updateUnidadAdministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(idunidadadministrativa, updateUnidadAdministrativaDto);
  }

  @Delete('/delete/:idunidadadministrativa')
  delete(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.delete(idunidadadministrativa);
  }
}
