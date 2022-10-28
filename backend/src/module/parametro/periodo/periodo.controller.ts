import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.periodoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodoService.store(createPeriodoDto);
  }

  @Get('/edit/:idperiodo')
  edit(@Param('idperiodo') id: string) {
    return this.periodoService.edit(id);
  }

  @Get('/show/:idperiodo')
  show(@Param('idperiodo') id: string) {
    return this.periodoService.show(id);
  }

  @Put('/update/:idperiodo')
  update(@Param('idperiodo') id: string, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoService.update(id, updatePeriodoDto);
  }

  @Delete('/delete/:idperiodo')
  remove(@Param('idperiodo') id: string) {
    return this.periodoService.delete(id);
  }
}
