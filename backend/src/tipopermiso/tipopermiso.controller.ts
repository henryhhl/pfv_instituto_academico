import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { TipoPermisoService } from './tipopermiso.service';
import { CreateTipoPermisoDto, UpdateTipoPermisoDto } from './dto';

@Controller('tipopermiso')
export class TipoPermisoController {

    constructor(
        private readonly tipoPermisoService: TipoPermisoService
    ) {

    }

    @Get('/index')
    getAllTipoPermiso() {
        return this.tipoPermisoService.getAll();
    }

    @Get('/edit/:idtipopermiso')
    getTipoPermisoById( @Param('idtipopermiso', ParseUUIDPipe) id: string ) {
        return this.tipoPermisoService.findTipoPermisoById(id);
    }

    @Post('/store')
    storeTipoPermiso( @Body() request: CreateTipoPermisoDto ) {
        return this.tipoPermisoService.storeTipoPermiso(request);
    }

    @Put('/update/:idtipopermiso')
    updateTipoPermiso( 
        @Param('idtipopermiso', ParseUUIDPipe) idtipopermiso: string, 
        @Body() request: UpdateTipoPermisoDto ) 
    {
        return this.tipoPermisoService.updateTipoPermiso(idtipopermiso, request);
    }
    
    @Delete('/delete/:idtipopermiso')
    deleteTipoPermiso( @Param('idtipopermiso', ParseUUIDPipe) idtipopermiso: string, @Body() body: any ) {
        return this.tipoPermisoService.deleteTipoPermiso(idtipopermiso);
    }

}
