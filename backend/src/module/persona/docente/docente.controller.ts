import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

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
  store(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.store(createDocenteDto);
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
  delete(@Param('iddocente') iddocente: string) {
    return this.docenteService.delete(iddocente);
  }
}
