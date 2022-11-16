import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ReferenciaContactoService } from './referenciacontacto.service';
import { CreateReferenciaContactoDto } from './dto/create-referenciacontacto.dto';
import { UpdateReferenciaContactoDto } from './dto/update-referenciacontacto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('referenciacontacto')
export class ReferenciaContactoController {
  constructor(private readonly referenciacontactoService: ReferenciaContactoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.referenciacontactoService.findAll( paginationDto );
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createReferenciacontactoDto: CreateReferenciaContactoDto) {
    return this.referenciacontactoService.store(createReferenciacontactoDto);
  }

  @Get('/edit/:idreferenciacontacto')
  @Auth( /**  N Permissions */ )
  edit(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.edit(id);
  }

  @Get('/show/:idreferenciacontacto')
  @Auth( /**  N Permissions */ )
  show(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.show(id);
  }

  @Patch('/update/:idreferenciacontacto')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idreferenciacontacto') id: string, @Body() updateReferenciacontactoDto: UpdateReferenciaContactoDto) {
    return this.referenciacontactoService.update(id, updateReferenciacontactoDto);
  }

  @Put('/update/:idreferenciacontacto')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idreferenciacontacto') id: string, @Body() updateReferenciacontactoDto: UpdateReferenciaContactoDto) {
    return this.referenciacontactoService.update(id, updateReferenciacontactoDto);
  }

  @Delete('/delete/:idreferenciacontacto')
  @Auth( /**  N Permissions */ )
  remove(@Param('idreferenciacontacto') id: string) {
    return this.referenciacontactoService.delete(id);
  }
}
