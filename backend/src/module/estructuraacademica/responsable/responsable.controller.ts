import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('responsable')
export class ResponsableController {
  constructor(private readonly responsableService: ResponsableService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll() {
    return this.responsableService.findAll();
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createResponsableDto: CreateResponsableDto) {
    return this.responsableService.store(createResponsableDto);
  }

  @Get('/show/:idresponsable')
  @Auth( /**  N Permissions */ )
  show(@Param('idresponsable') id: string) {
    return this.responsableService.show(id);
  }

  @Get('/edit/:idresponsable')
  @Auth( /**  N Permissions */ )
  edit(@Param('idresponsable') id: string) {
    return this.responsableService.edit(id);
  }

  @Patch('/update/:idresponsable')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idresponsable') id: string, @Body() updateResponsableDto: UpdateResponsableDto) {
    return this.responsableService.update(id, updateResponsableDto);
  }

  @Put('/update/:idresponsable')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idresponsable') id: string, @Body() updateResponsableDto: UpdateResponsableDto) {
    return this.responsableService.update(id, updateResponsableDto);
  }

  @Delete('/delete/:idresponsable')
  @Auth( /**  N Permissions */ )
  remove(@Param('idresponsable') id: string) {
    return this.responsableService.remove(id);
  }
}
