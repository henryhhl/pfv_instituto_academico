import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('negocio')
export class NegocioController {
  constructor(private readonly negocioService: NegocioService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.negocioService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createNegocioDto: CreateNegocioDto) {
    return this.negocioService.store(createNegocioDto);
  }

  @Get('/edit/:idnegocio')
  @Auth( /**  N Permissions */ )
  edit(@Param('idnegocio') idnegocio: string) {
    return this.negocioService.edit(idnegocio);
  }

  @Get('/show/:idnegocio')
  @Auth( /**  N Permissions */ )
  show(@Param('idnegocio') idnegocio: string) {
    return this.negocioService.show(idnegocio);
  }

  @Patch('/update/:idnegocio')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idnegocio') idnegocio: string, @Body() updateNegocioDto: UpdateNegocioDto) {
    return this.negocioService.update(idnegocio, updateNegocioDto);
  }

  @Put('/update/:idnegocio')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idnegocio') idnegocio: string, @Body() updateNegocioDto: UpdateNegocioDto) {
    return this.negocioService.update(idnegocio, updateNegocioDto);
  }

  @Delete('/delete/:idnegocio')
  @Auth( /**  N Permissions */ )
  delete(@Param('idnegocio') idnegocio: string) {
    return this.negocioService.delete(idnegocio);
  }
}
