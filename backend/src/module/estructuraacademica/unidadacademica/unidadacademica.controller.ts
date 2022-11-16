import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UnidadacademicaService } from './unidadacademica.service';
import { CreateUnidadAcademicaDto } from './dto/create-unidadacademica.dto';
import { UpdateUnidadAcademicaDto } from './dto/update-unidadacademica.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('unidadacademica')
export class UnidadacademicaController {
  constructor(private readonly unidadacademicaService: UnidadacademicaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.unidadacademicaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createUnidadacademicaDto: CreateUnidadAcademicaDto) {
    return this.unidadacademicaService.create(createUnidadacademicaDto);
  }

  @Get('/edit/:idunidadacademica')
  @Auth( /**  N Permissions */ )
  edit(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.edit(id);
  }

  @Get('/show/:idunidadacademica')
  @Auth( /**  N Permissions */ )
  show(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.show(id);
  }

  @Patch('/update/:idunidadacademica')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idunidadacademica') id: string, @Body() updateUnidadacademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadacademicaService.update(id, updateUnidadacademicaDto);
  }

  @Put('/update/:idunidadacademica')
  @Auth( /**  N Permissions */ )
  update(@Param('idunidadacademica') id: string, @Body() updateUnidadacademicaDto: UpdateUnidadAcademicaDto) {
    return this.unidadacademicaService.update(id, updateUnidadacademicaDto);
  }

  @Delete('/delete/:idunidadacademica')
  @Auth( /**  N Permissions */ )
  delete(@Param('idunidadacademica') id: string) {
    return this.unidadacademicaService.delete(id);
  }
}
