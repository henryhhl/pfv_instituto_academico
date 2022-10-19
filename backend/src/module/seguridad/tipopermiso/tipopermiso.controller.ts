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
        let listTipoPermiso = this.tipoPermisoService.getAll();
        return {
            resp: 1,
            error: false,
            message: 'Servicio realizado exitosamente.',
            arrayTipoPermiso: listTipoPermiso,
        };
    }

    @Post('/store')
    storeTipoPermiso( @Body() request: CreateTipoPermisoDto ) {
        return this.tipoPermisoService.storeTipoPermiso(request);
    }

    @Get('/show/:idtipopermiso')
    showTipoPermiso( @Param('idtipopermiso', ParseUUIDPipe) id: string ) {
        return this.tipoPermisoService.showTipoPermiso(id);
    }

    @Get('/edit/:idtipopermiso')
    getTipoPermisoById( @Param('idtipopermiso', ParseUUIDPipe) id: string ) {
        return this.tipoPermisoService.editTipoPermiso(id);
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
