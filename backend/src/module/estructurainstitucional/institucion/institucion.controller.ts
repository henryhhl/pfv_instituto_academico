import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { InstitucionService } from './institucion.service';
import { CreateInstitucionDto } from './dto/create-institucion.dto';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('institucion')
export class InstitucionController {
  constructor(private readonly institucionService: InstitucionService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.institucionService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createInstitucionDto: CreateInstitucionDto) {
    return this.institucionService.store(createInstitucionDto);
  }

  @Get('/edit/:idinstitucion')
  edit(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.edit(idinstitucion);
  }

  @Get('/show/:idinstitucion')
  show(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.show(idinstitucion);
  }

  @Patch('/update/:idinstitucion')
  updatePatch(@Param('idinstitucion') idinstitucion: string, @Body() updateInstitucionDto: UpdateInstitucionDto) {
    return this.institucionService.update(idinstitucion, updateInstitucionDto);
  }

  @Put('/update/:idinstitucion')
  updatePut(@Param('idinstitucion') idinstitucion: string, @Body() updateInstitucionDto: UpdateInstitucionDto) {
    return this.institucionService.update(idinstitucion, updateInstitucionDto);
  }

  @Delete('/delete/:idinstitucion')
  delete(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.delete(idinstitucion);
  }
}
