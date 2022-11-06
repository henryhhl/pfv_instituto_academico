import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoriaDocumentoService } from './categoriadocumento.service';
import { CreateCategoriaDocumentoDto } from './dto/create-categoriadocumento.dto';
import { UpdateCategoriaDocumentoDto } from './dto/update-categoriadocumento.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('categoriadocumento')
export class CategoriaDocumentoController {
  constructor(private readonly categoriadocumentoService: CategoriaDocumentoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.categoriadocumentoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createCategoriadocumentoDto: CreateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.store(createCategoriadocumentoDto);
  }

  @Get('/edit/:idcategoriadocumento')
  edit(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.edit(idcategoriadocumento);
  }

  @Get('/show/:idcategoriadocumento')
  show(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.show(idcategoriadocumento);
  }

  @Patch('/update/:idcategoriadocumento')
  updatePatch(@Param('idcategoriadocumento') idcategoriadocumento: string, @Body() updateCategoriadocumentoDto: UpdateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.update(idcategoriadocumento, updateCategoriadocumentoDto);
  }

  @Put('/update/:idcategoriadocumento')
  updatePut(@Param('idcategoriadocumento') idcategoriadocumento: string, @Body() updateCategoriadocumentoDto: UpdateCategoriaDocumentoDto) {
    return this.categoriadocumentoService.update(idcategoriadocumento, updateCategoriadocumentoDto);
  }

  @Delete('/delete/:idcategoriadocumento')
  delete(@Param('idcategoriadocumento') idcategoriadocumento: string) {
    return this.categoriadocumentoService.delete(idcategoriadocumento);
  }
}
