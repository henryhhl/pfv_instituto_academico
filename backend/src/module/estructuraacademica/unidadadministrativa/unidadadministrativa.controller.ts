import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UnidadAdministrativaService } from './unidadadministrativa.service';
import { CreateUnidadAdministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadAdministrativaDto } from './dto/update-unidadadministrativa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('unidadadministrativa')
export class UnidadAdministrativaController {
  constructor(private readonly unidadAdministrativaService: UnidadAdministrativaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.unidadAdministrativaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  create(@Body() createUnidadAdministrativaDto: CreateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.store(createUnidadAdministrativaDto);
  }

  @Get('/edit/:idunidadadministrativa')
  @Auth( /**  N Permissions */ )
  edit(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.edit(idunidadadministrativa);
  }

  @Get('/show/:idunidadadministrativa')
  @Auth( /**  N Permissions */ )
  show(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.show(idunidadadministrativa);
  }

  @Patch('/update/:idunidadadministrativa')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idunidadadministrativa') idunidadadministrativa: string, @Body() updateUnidadAdministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(idunidadadministrativa, updateUnidadAdministrativaDto);
  }

  @Put('/update/:idunidadadministrativa')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idunidadadministrativa') idunidadadministrativa: string, @Body() updateUnidadAdministrativaDto: UpdateUnidadAdministrativaDto) {
    return this.unidadAdministrativaService.update(idunidadadministrativa, updateUnidadAdministrativaDto);
  }

  @Delete('/delete/:idunidadadministrativa')
  @Auth( /**  N Permissions */ )
  delete(@Param('idunidadadministrativa') idunidadadministrativa: string) {
    return this.unidadAdministrativaService.delete(idunidadadministrativa);
  }
}
