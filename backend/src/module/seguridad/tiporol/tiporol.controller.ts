import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TipoRolService } from './tiporol.service';
import { CreateTipoRolDto, UpdateTipoRolDto } from './dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('tiporol')
export class TipoRolController {

    constructor( private readonly tipoRolService: TipoRolService ) {}

    @Get('/index')
    @Auth( /**  N Permissions */ )
    findAll( @Query() paginationDto: PaginationDto ) {
        return this.tipoRolService.findAll(paginationDto);
    }

    @Post('/store')
    @Auth( /**  N Permissions */ )
    store(@Body() createMateriaDto: CreateTipoRolDto) {
        return this.tipoRolService.store(createMateriaDto);
    }

    @Get('/edit/:idtiporol')
    @Auth( /**  N Permissions */ )
    edit(@Param('idtiporol') id: string) {
        return this.tipoRolService.edit(id);
    }

    @Get('/show/:idtiporol')
    @Auth( /**  N Permissions */ )
    show(@Param('idtiporol') id: string) {
        return this.tipoRolService.show(id);
    }

    @Put('/update/:idtiporol')
    @Auth( /**  N Permissions */ )
    update(@Param('idtiporol') id: string, @Body() updateMateriaDto: UpdateTipoRolDto) {
        return this.tipoRolService.update(id, updateMateriaDto);
    }

    @Delete('/delete/:idtiporol')
    @Auth( /**  N Permissions */ )
    delete(@Param('idtiporol') id: string) {
        return this.tipoRolService.delete(id);
    }

}
