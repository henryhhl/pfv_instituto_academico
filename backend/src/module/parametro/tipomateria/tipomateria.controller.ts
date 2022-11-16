import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { TipoMateriaService } from './tipomateria.service';
import { CreateTipoMateriaDto } from './dto/create-tipomateria.dto';
import { UpdateTipoMateriaDto } from './dto/update-tipomateria.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tipomateria')
export class TipoMateriaController {
  constructor(private readonly tipomateriaService: TipoMateriaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.tipomateriaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createTipoMateriaDto: CreateTipoMateriaDto) {
    return this.tipomateriaService.store(createTipoMateriaDto);
  }

  @Get('/edit/:idtipomateria')
  @Auth( /**  N Permissions */ )
  edit(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.edit(id);
  }

  @Get('/show/:idtipomateria')
  @Auth( /**  N Permissions */ )
  show(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.show(id);
  }

  @Put('/update/:idtipomateria')
  @Auth( /**  N Permissions */ )
  update(@Param('idtipomateria', ParseUUIDPipe) id: string, @Body() updateTipomateriaDto: UpdateTipoMateriaDto) {
    return this.tipomateriaService.update(id, updateTipomateriaDto);
  }

  @Delete('/delete/:idtipomateria')
  @Auth( /**  N Permissions */ )
  remove(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.delete(id);
  }
}
