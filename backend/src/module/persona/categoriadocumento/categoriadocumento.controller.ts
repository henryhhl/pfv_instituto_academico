import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoriaDocumentoService } from './categoriadocumento.service';
import { CreateCategoriaDocumentoDto } from './dto/create-categoriadocumento.dto';
import { UpdateCategoriaDocumentoDto } from './dto/update-categoriadocumento.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('categoriadocumento')
export class CategoriaDocumentoController {
  constructor(private readonly categoriadocumentoService: CategoriaDocumentoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.categoriadocumentoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createCategoriadocumentoDto: CreateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.store(createCategoriadocumentoDto);
  }

  @Get('/edit/:idcategoriadocumento')
  @Auth( /**  N Permissions */ )
  edit(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.edit(idcategoriadocumento);
  }

  @Get('/show/:idcategoriadocumento')
  @Auth( /**  N Permissions */ )
  show(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.show(idcategoriadocumento);
  }

  @Patch('/update/:idcategoriadocumento')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idcategoriadocumento') idcategoriadocumento: string, @Body() updateCategoriadocumentoDto: UpdateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.update(idcategoriadocumento, updateCategoriadocumentoDto);
  }

  @Put('/update/:idcategoriadocumento')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idcategoriadocumento') idcategoriadocumento: string, @Body() updateCategoriadocumentoDto: UpdateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.update(idcategoriadocumento, updateCategoriadocumentoDto);
  }

  @Delete('/delete/:idcategoriadocumento')
  @Auth( /**  N Permissions */ )
  delete(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.delete(idcategoriadocumento);
  }
}
