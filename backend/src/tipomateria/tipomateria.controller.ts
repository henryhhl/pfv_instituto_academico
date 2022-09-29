import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TipoMateriaService } from './tipomateria.service';
import { CreateTipoMateriaDto } from './dto/create-tipomateria.dto';
import { UpdateTipoMateriaDto } from './dto/update-tipomateria.dto';

@Controller('tipomateria')
export class TipoMateriaController {
  constructor(private readonly tipomateriaService: TipoMateriaService) {}

  @Post('/store')
  create(@Body() createTipoMateriaDto: CreateTipoMateriaDto) {
    return this.tipomateriaService.create(createTipoMateriaDto);
  }

  @Get('/index')
  findAll() {
    return this.tipomateriaService.findAll();
  }

  @Get('/edit/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipomateriaDto: UpdateTipoMateriaDto) {
    return this.tipomateriaService.update(id, updateTipomateriaDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipomateriaService.remove(id);
  }
}
