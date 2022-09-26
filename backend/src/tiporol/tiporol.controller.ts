import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { TipoRolService } from './tiporol.service';

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

    @Get('/edit/:idtiporol')
    getTipoRolById( @Param('idtiporol', ParseIntPipe) id: string ) {
        if (false) {
            throw new NotFoundException('Eror al realizar servicio.');
        }
        return this.tipoRolService.findTipoRolById(Number(id));
    }

}
