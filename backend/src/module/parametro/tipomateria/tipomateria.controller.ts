import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { TipoMateriaService } from './tipomateria.service';
import { CreateTipoMateriaDto } from './dto/create-tipomateria.dto';
import { UpdateTipoMateriaDto } from './dto/update-tipomateria.dto';

@Controller('tipomateria')
export class TipoMateriaController {
  constructor(private readonly tipomateriaService: TipoMateriaService) {}

  @Get('/index')
  findAll() {
    return this.tipomateriaService.findAll();
  }

  @Post('/store')
  store(@Body() createTipoMateriaDto: CreateTipoMateriaDto) {
    return this.tipomateriaService.store(createTipoMateriaDto);
  }

  @Get('/edit/:idtipomateria')
  edit(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.edit(id);
  }

  @Get('/show/:idtipomateria')
  show(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.show(id);
  }

  @Put('/update/:idtipomateria')
  update(@Param('idtipomateria', ParseUUIDPipe) id: string, @Body() updateTipomateriaDto: UpdateTipoMateriaDto) {
    return this.tipomateriaService.update(id, updateTipomateriaDto);
  }

  @Delete('/delete/:idtipomateria')
  remove(@Param('idtipomateria', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.remove(id);
  }
}
