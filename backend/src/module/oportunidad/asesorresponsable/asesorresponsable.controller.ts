import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { AsesorResponsableService } from './asesorresponsable.service';
import { CreateAsesorResponsableDto } from './dto/create-asesorresponsable.dto';
import { UpdateAsesorResponsableDto } from './dto/update-asesorresponsable.dto';

@Controller('asesorresponsable')
export class AsesorresponsableController {
  constructor(private readonly asesorresponsableService: AsesorResponsableService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.asesorresponsableService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createAsesorresponsableDto: CreateAsesorResponsableDto) {
    return this.asesorresponsableService.store(createAsesorresponsableDto);
  }

  @Get('/edit/:idasesorresponsable')
  @Auth( /**  N Permissions */ )
  edit(@Param('idasesorresponsable') idasesorresponsable: string) {
    return this.asesorresponsableService.edit(idasesorresponsable);
  }

  @Get('/show/:idasesorresponsable')
  @Auth( /**  N Permissions */ )
  show(@Param('idasesorresponsable') idasesorresponsable: string) {
    return this.asesorresponsableService.show(idasesorresponsable);
  }

  @Patch('/update/:idasesorresponsable')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idasesorresponsable') idasesorresponsable: string, @Body() updateAsesorresponsableDto: UpdateAsesorResponsableDto) {
    return this.asesorresponsableService.update(idasesorresponsable, updateAsesorresponsableDto);
  }

  @Put('/update/:idasesorresponsable')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idasesorresponsable') idasesorresponsable: string, @Body() updateAsesorresponsableDto: UpdateAsesorResponsableDto) {
    return this.asesorresponsableService.update(idasesorresponsable, updateAsesorresponsableDto);
  }

  @Delete('/delete/:idasesorresponsable')
  @Auth( /**  N Permissions */ )
  delete(@Param('idasesorresponsable') idasesorresponsable: string) {
    return this.asesorresponsableService.delete(idasesorresponsable);
  }
}
