import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReferenciaContactoService } from './referenciacontacto.service';
import { CreateReferenciaContactoDto } from './dto/create-referenciacontacto.dto';
import { UpdateReferenciaContactoDto } from './dto/update-referenciacontacto.dto';

@Controller('referenciacontacto')
export class ReferenciaContactoController {
  constructor(private readonly referenciacontactoService: ReferenciaContactoService) {}

  @Get('/index')
  findAll() {
    return this.referenciacontactoService.findAll();
  }

  @Post('/store')
  store(@Body() createReferenciacontactoDto: CreateReferenciaContactoDto) {
    return this.referenciacontactoService.store(createReferenciacontactoDto);
  }

  @Get('/edit/:idreferenciacontacto')
  edit(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.findOne(id);
  }

  @Get('/show/:idreferenciacontacto')
  show(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.findOne(id);
  }

  @Patch('/update/:idreferenciacontacto')
  updatePatch(@Param('idreferenciacontacto') id: string, @Body() updateReferenciacontactoDto: UpdateReferenciaContactoDto) {
    return this.referenciacontactoService.update(id, updateReferenciacontactoDto);
  }

  @Put('/update/:idreferenciacontacto')
  updatePut(@Param('idreferenciacontacto') id: string, @Body() updateReferenciacontactoDto: UpdateReferenciaContactoDto) {
    return this.referenciacontactoService.update(id, updateReferenciacontactoDto);
  }

  @Delete('/delete/:idreferenciacontacto')
  remove(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.remove(id);
  }
}
