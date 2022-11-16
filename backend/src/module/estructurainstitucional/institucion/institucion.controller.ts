import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { InstitucionService } from './institucion.service';
import { CreateInstitucionDto } from './dto/create-institucion.dto';
import { UpdateInstitucionDto } from './dto/update-institucion.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('institucion')
export class InstitucionController {
  constructor(private readonly institucionService: InstitucionService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.institucionService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createInstitucionDto: CreateInstitucionDto) {
    return this.institucionService.store(createInstitucionDto);
  }

  @Get('/edit/:idinstitucion')
  @Auth( /**  N Permissions */ )
  edit(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.edit(idinstitucion);
  }

  @Get('/show/:idinstitucion')
  @Auth( /**  N Permissions */ )
  show(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.show(idinstitucion);
  }

  @Patch('/update/:idinstitucion')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idinstitucion') idinstitucion: string, @Body() updateInstitucionDto: UpdateInstitucionDto) {
    return this.institucionService.update(idinstitucion, updateInstitucionDto);
  }

  @Put('/update/:idinstitucion')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idinstitucion') idinstitucion: string, @Body() updateInstitucionDto: UpdateInstitucionDto) {
    return this.institucionService.update(idinstitucion, updateInstitucionDto);
  }

  @Delete('/delete/:idinstitucion')
  @Auth( /**  N Permissions */ )
  delete(@Param('idinstitucion') idinstitucion: string) {
    return this.institucionService.delete(idinstitucion);
  }
}
