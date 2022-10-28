import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TipoRolService } from './tiporol.service';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('tiporol')
export class TipoRolController {

    constructor( private readonly tipoRolService: TipoRolService ) {}

    @Get('/index')
    findAll( @Query() paginationDto: PaginationDto ) {
        return this.tipoRolService.findAll(paginationDto);
    }

    @Post('/store')
    store(@Body() createMateriaDto: CreateTipoRolDto) {
        return this.tipoRolService.store(createMateriaDto);
    }

    @Get('/edit/:idtiporol')
    edit(@Param('idtiporol') id: string) {
        return this.tipoRolService.edit(id);
    }

    @Get('/show/:idtiporol')
    show(@Param('idtiporol') id: string) {
        return this.tipoRolService.show(id);
    }

    @Put('/update/:idtiporol')
    update(@Param('idtiporol') id: string, @Body() updateMateriaDto: UpdateTipoRolDto) {
        return this.tipoRolService.update(id, updateMateriaDto);
    }

    @Delete('/delete/:idtiporol')
    delete(@Param('idtiporol') id: string) {
        return this.tipoRolService.delete(id);
    }

}
