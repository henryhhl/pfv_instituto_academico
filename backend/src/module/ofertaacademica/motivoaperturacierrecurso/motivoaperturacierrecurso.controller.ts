import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { MotivoAperturaCierreCursoService } from './motivoaperturacierrecurso.service';
import { CreateMotivoAperturaCierreCursoDto } from './dto/create-motivoaperturacierrecurso.dto';
import { UpdateMotivoAperturaCierreCursoDto } from './dto/update-motivoaperturacierrecurso.dto';

@Controller('motivoaperturacierrecurso')
export class MotivoAperturaCierreCursoController {
  constructor(private readonly motivoaperturacierrecursoService: MotivoAperturaCierreCursoService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.motivoaperturacierrecursoService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createMotivoaperturacierrecursoDto: CreateMotivoAperturaCierreCursoDto) {
    return this.motivoaperturacierrecursoService.store(createMotivoaperturacierrecursoDto);
  }

  @Get('/edit/:idmotivoaperturacierrecurso')
  @Auth( /**  N Permissions */ )
  edit(@Param('idmotivoaperturacierrecurso') idmotivoaperturacierrecurso: string) {
    return this.motivoaperturacierrecursoService.edit(idmotivoaperturacierrecurso);
  }

  @Get('/show/:idmotivoaperturacierrecurso')
  @Auth( /**  N Permissions */ )
  show(@Param('idmotivoaperturacierrecurso') idmotivoaperturacierrecurso: string) {
    return this.motivoaperturacierrecursoService.show(idmotivoaperturacierrecurso);
  }

  @Patch('/update/:idmotivoaperturacierrecurso')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idmotivoaperturacierrecurso') idmotivoaperturacierrecurso: string, @Body() updateMotivoaperturacierrecursoDto: UpdateMotivoAperturaCierreCursoDto) {
    return this.motivoaperturacierrecursoService.update(idmotivoaperturacierrecurso, updateMotivoaperturacierrecursoDto);
  }

  @Put('/update/:idmotivoaperturacierrecurso')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idmotivoaperturacierrecurso') idmotivoaperturacierrecurso: string, @Body() updateMotivoaperturacierrecursoDto: UpdateMotivoAperturaCierreCursoDto) {
    return this.motivoaperturacierrecursoService.update(idmotivoaperturacierrecurso, updateMotivoaperturacierrecursoDto);
  }

  @Delete('/delete/:idmotivoaperturacierrecurso')
  @Auth( /**  N Permissions */ )
  delete(@Param('idmotivoaperturacierrecurso') idmotivoaperturacierrecurso: string) {
    return this.motivoaperturacierrecursoService.delete(idmotivoaperturacierrecurso);
  }
}
