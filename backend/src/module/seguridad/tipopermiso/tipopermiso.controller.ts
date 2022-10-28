import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
import { TipoPermisoService } from './tipopermiso.service';
import { CreateTipoPermisoDto, UpdateTipoPermisoDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tipopermiso')
export class TipoPermisoController {

    constructor( private readonly tipoPermisoService: TipoPermisoService ) {}

    @Get('/index')
    findAll( @Query() paginationDto: PaginationDto ) {
        return this.tipoPermisoService.findAll(paginationDto);
    }

    @Post('/store')
    store(@Body() createMateriaDto: CreateTipoPermisoDto) {
        return this.tipoPermisoService.store(createMateriaDto);
    }

    @Get('/edit/:idtipopermiso')
    edit(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.edit(id);
    }

    @Get('/show/:idtipopermiso')
    show(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.show(id);
    }

    @Put('/update/:idtipopermiso')
    update(@Param('idtipopermiso') id: string, @Body() updateMateriaDto: UpdateTipoPermisoDto) {
        return this.tipoPermisoService.update(id, updateMateriaDto);
    }

    @Delete('/delete/:idtipopermiso')
    delete(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.delete(id);
    }

}
