import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.periodoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodoService.store(createPeriodoDto);
  }

  @Get('/edit/:idperiodo')
  @Auth( /**  N Permissions */ )
  edit(@Param('idperiodo') id: string) {
    return this.periodoService.edit(id);
  }

  @Get('/show/:idperiodo')
  @Auth( /**  N Permissions */ )
  show(@Param('idperiodo') id: string) {
    return this.periodoService.show(id);
  }

  @Put('/update/:idperiodo')
  @Auth( /**  N Permissions */ )
  update(@Param('idperiodo') id: string, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoService.update(id, updatePeriodoDto);
  }

  @Delete('/delete/:idperiodo')
  @Auth( /**  N Permissions */ )
  remove(@Param('idperiodo') id: string) {
    return this.periodoService.delete(id);
  }
}
