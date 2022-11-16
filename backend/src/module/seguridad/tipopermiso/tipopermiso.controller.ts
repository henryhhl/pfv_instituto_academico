import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
import { TipoPermisoService } from './tipopermiso.service';
import { CreateTipoPermisoDto, UpdateTipoPermisoDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tipopermiso')
export class TipoPermisoController {

    constructor( private readonly tipoPermisoService: TipoPermisoService ) {}

    @Get('/index')
    @Auth( /**  N Permissions */ )
    findAll( @Query() paginationDto: PaginationDto ) {
        return this.tipoPermisoService.findAll(paginationDto);
    }

    @Post('/store')
    @Auth( /**  N Permissions */ )
    store(@Body() createMateriaDto: CreateTipoPermisoDto) {
        return this.tipoPermisoService.store(createMateriaDto);
    }

    @Get('/edit/:idtipopermiso')
    @Auth( /**  N Permissions */ )
    edit(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.edit(id);
    }

    @Get('/show/:idtipopermiso')
    @Auth( /**  N Permissions */ )
    show(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.show(id);
    }

    @Put('/update/:idtipopermiso')
    @Auth( /**  N Permissions */ )
    update(@Param('idtipopermiso') id: string, @Body() updateMateriaDto: UpdateTipoPermisoDto) {
        return this.tipoPermisoService.update(id, updateMateriaDto);
    }

    @Delete('/delete/:idtipopermiso')
    @Auth( /**  N Permissions */ )
    delete(@Param('idtipopermiso') id: string) {
        return this.tipoPermisoService.delete(id);
    }

}
