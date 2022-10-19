import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';

@Controller('responsable')
export class ResponsableController {
  constructor(private readonly responsableService: ResponsableService) {}

  @Get('/index')
  findAll() {
    return this.responsableService.findAll();
  }

  @Post('/store')
  store(@Body() createResponsableDto: CreateResponsableDto) {
    return this.responsableService.store(createResponsableDto);
  }

  @Get('/show/:idresponsable')
  show(@Param('idresponsable') id: string) {
    return this.responsableService.show(id);
  }

  @Get('/edit/:idresponsable')
  edit(@Param('idresponsable') id: string) {
    return this.responsableService.edit(id);
  }

  @Patch('/update/:idresponsable')
  updatePatch(@Param('idresponsable') id: string, @Body() updateResponsableDto: UpdateResponsableDto) {
    return this.responsableService.update(id, updateResponsableDto);
  }

  @Put('/update/:idresponsable')
  updatePut(@Param('idresponsable') id: string, @Body() updateResponsableDto: UpdateResponsableDto) {
    return this.responsableService.update(id, updateResponsableDto);
  }

  @Delete('/delete/:idresponsable')
  remove(@Param('idresponsable') id: string) {
    return this.responsableService.remove(id);
  }
}
