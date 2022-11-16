import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { NivelAcademicoService } from './nivelacademico.service';
import { CreateNivelAcademicoDto } from './dto/create-nivelacademico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivelacademico.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('nivelacademico')
@Auth( /**  N Permissions */ )
export class NivelAcademicoController {
  constructor(private readonly nivelacademicoService: NivelAcademicoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.nivelacademicoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createNivelacademicoDto: CreateNivelAcademicoDto) {
    return this.nivelacademicoService.store(createNivelacademicoDto);
  }

  @Get('/edit/:idnivelacademico')
  @Auth( /**  N Permissions */ )
  edit(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.edit(id);
  }

  @Get('/show/:idnivelacademico')
  @Auth( /**  N Permissions */ )
  show(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.show(id);
  }

  @Put('/update/:idnivelacademico')
  @Auth( /**  N Permissions */ )
  update(@Param('idnivelacademico') id: string, @Body() updateNivelacademicoDto: UpdateNivelAcademicoDto) {
    return this.nivelacademicoService.update(id, updateNivelacademicoDto);
  }

  @Delete('/delete/:idnivelacademico')
  @Auth( /**  N Permissions */ )
  remove(@Param('idnivelacademico') id: string) {
    return this.nivelacademicoService.delete(id);
  }
}
