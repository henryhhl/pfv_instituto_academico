import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, Query } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.programaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  @HttpCode( HttpStatus.OK )
  store(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.store(createProgramaDto);
  }

  @Get('/show/:idprograma')
  @Auth( /**  N Permissions */ )
  show(@Param('idprograma') id: string) {
    return this.programaService.show(id);
  }

  @Get('/edit/:idprograma')
  @Auth( /**  N Permissions */ )
  edit(@Param('idprograma') id: string) {
    return this.programaService.edit(id);
  }

  @Patch('/update/:idprograma')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idprograma') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(id, updateProgramaDto);
  }

  @Put('/update/:idprograma')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idprograma') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(id, updateProgramaDto);
  }

  @Delete('/delete/:idprograma')
  @Auth( /**  N Permissions */ )
  delete(@Param('idprograma') id: string) {
    return this.programaService.delete(id);
  }
}
