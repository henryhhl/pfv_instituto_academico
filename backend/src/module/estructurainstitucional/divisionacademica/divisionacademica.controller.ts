import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { DivisionAcademicaService } from './divisionacademica.service';
import { CreateDivisionAcademicaDto } from './dto/create-divisionacademica.dto';
import { UpdateDivisionAcademicaDto } from './dto/update-divisionacademica.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('divisionacademica')
export class DivisionAcademicaController {
  constructor(private readonly divisionacademicaService: DivisionAcademicaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.divisionacademicaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createDivisionacademicaDto: CreateDivisionAcademicaDto) {
    return this.divisionacademicaService.store(createDivisionacademicaDto);
  }

  @Get('/edit/:iddivisionacademica')
  @Auth( /**  N Permissions */ )
  edit(@Param('iddivisionacademica') iddivisionacademica: string) {
    return this.divisionacademicaService.edit(iddivisionacademica);
  }

  @Get('/show/:iddivisionacademica')
  @Auth( /**  N Permissions */ )
  show(@Param('iddivisionacademica') iddivisionacademica: string) {
    return this.divisionacademicaService.show(iddivisionacademica);
  }

  @Patch('/update/:iddivisionacademica')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('iddivisionacademica') iddivisionacademica: string, @Body() updateDivisionacademicaDto: UpdateDivisionAcademicaDto) {
    return this.divisionacademicaService.update(iddivisionacademica, updateDivisionacademicaDto);
  }

  @Put('/update/:iddivisionacademica')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('iddivisionacademica') iddivisionacademica: string, @Body() updateDivisionacademicaDto: UpdateDivisionAcademicaDto) {
    return this.divisionacademicaService.update(iddivisionacademica, updateDivisionacademicaDto);
  }

  @Delete('/delete/:iddivisionacademica')
  @Auth( /**  N Permissions */ )
  delete(@Param('iddivisionacademica') iddivisionacademica: string) {
    return this.divisionacademicaService.delete(iddivisionacademica);
  }
}
