import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.aulaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.store(createAulaDto);
  }

  @Get('/edit/:idaula')
  @Auth( /**  N Permissions */ )
  edit(@Param('idaula') idaula: string) {
    return this.aulaService.edit(idaula);
  }

  @Get('/show/:idaula')
  @Auth( /**  N Permissions */ )
  show(@Param('idaula') idaula: string) {
    return this.aulaService.show(idaula);
  }

  @Patch('/update/:idaula')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idaula') idaula: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(idaula, updateAulaDto);
  }

  @Put('/update/:idaula')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idaula') idaula: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(idaula, updateAulaDto);
  }

  @Delete('/delete/:idaula')
  @Auth( /**  N Permissions */ )
  delete(@Param('idaula') idaula: string) {
    return this.aulaService.delete(idaula);
  }
}
