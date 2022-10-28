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
  create(@Body() createUnidadadministrativaDto: CreateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.store(createUnidadadministrativaDto);
  }

  @Get('/edit/:idunidadadministrativa')
  edit(@Param('idunidadadministrativa') id: string) {
    return this.unidadAdministrativaService.edit(id);
  }

  @Get('/show/:idunidadadministrativa')
  show(@Param('idunidadadministrativa') id: string) {
    return this.unidadAdministrativaService.show(id);
  }

  @Patch('/update/:idunidadadministrativa')
  updatePatch(@Param('idunidadadministrativa') id: string, @Body() updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(id, updateUnidadadministrativaDto);
  }

  @Put('/update/:idunidadadministrativa')
  updatePut(@Param('idunidadadministrativa') id: string, @Body() updateUnidadadministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(id, updateUnidadadministrativaDto);
  }

  @Delete('/delete/:idunidadadministrativa')
  delete(@Param('idunidadadministrativa') id: string) {
    return this.unidadAdministrativaService.delete(id);
  }
}
