import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { InscripcionProgramaPaginationDto } from './dto/pagination.dto';
import { InscripcionProgramaService } from './inscripcionprograma.service';
import { CreateInscripcionProgramaDto } from './dto/create-inscripcionprograma.dto';
import { UpdateInscripcionProgramaDto } from './dto/update-inscripcionprograma.dto';

@Controller('inscripcionprograma')
export class InscripcionProgramaController {
  constructor(private readonly inscripcionprogramaService: InscripcionProgramaService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: InscripcionProgramaPaginationDto ) {
    return this.inscripcionprogramaService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createInscripcionprogramaDto: CreateInscripcionProgramaDto) {
    return this.inscripcionprogramaService.store(createInscripcionprogramaDto);
  }

  @Get('/edit/:idinscripcionprograma')
  @Auth( /**  N Permissions */ )
  edit(@Param('idinscripcionprograma') idinscripcionprograma: string) {
    return this.inscripcionprogramaService.edit(idinscripcionprograma);
  }

  @Get('/show/:idinscripcionprograma')
  @Auth( /**  N Permissions */ )
  show(@Param('idinscripcionprograma') idinscripcionprograma: string) {
    return this.inscripcionprogramaService.show(idinscripcionprograma);
  }

  @Patch('/update/:idinscripcionprograma')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idinscripcionprograma') idinscripcionprograma: string, @Body() updateInscripcionprogramaDto: UpdateInscripcionProgramaDto) {
    return this.inscripcionprogramaService.update(idinscripcionprograma, updateInscripcionprogramaDto);
  }

  @Put('/update/:idinscripcionprograma')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idinscripcionprograma') idinscripcionprograma: string, @Body() updateInscripcionprogramaDto: UpdateInscripcionProgramaDto) {
    return this.inscripcionprogramaService.update(idinscripcionprograma, updateInscripcionprogramaDto);
  }

  @Delete('/delete/:idinscripcionprograma')
  @Auth( /**  N Permissions */ )
  delete(@Param('idinscripcionprograma') idinscripcionprograma: string) {
    return this.inscripcionprogramaService.delete(idinscripcionprograma);
  }
}
