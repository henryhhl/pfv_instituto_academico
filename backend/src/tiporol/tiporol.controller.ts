import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, } from '@nestjs/common';
import { TipoRolService } from './tiporol.service';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';

@Controller('tiporol')
export class TipoRolController {

    constructor(
        private readonly tipoRolService: TipoRolService
    ) {

    }

    @Get('/index')
    getAllTipoRol() {
        return this.tipoRolService.getAll();
    }

    @Post('/store')
    storeTipoRol( @Body() request: CreateTipoRolDto ) {
        return this.tipoRolService.storeTipoRol(request);
    }

    @Get('/show/:idtiporol')
    showTipoPermiso( @Param('idtiporol', ParseUUIDPipe) id: string ) {
        return this.tipoRolService.showTipoRol(id);
    }

    @Get('/edit/:idtiporol')
    getTipoPermisoById( @Param('idtiporol', ParseUUIDPipe) id: string ) {
        return this.tipoRolService.editTipoRol(id);
    }

    @Put('/update/:idtiporol')
    updateTipoRol( 
        @Param('idtiporol', ParseUUIDPipe) idtiporol: string, 
        @Body() request: UpdateTipoRolDto ) 
    {
        return this.tipoRolService.updateTipoRol(idtiporol, request);
    }
    
    @Delete('/delete/:idtiporol')
    deleteTipoRol( @Param('idtiporol', ParseUUIDPipe) idtiporol: string, @Body() body: any ) {
        return this.tipoRolService.deleteTipoRol(idtiporol);
    }

}