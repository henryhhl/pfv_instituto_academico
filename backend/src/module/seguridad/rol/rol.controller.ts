import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get('/index')
    findAll( @Query() paginationDto: PaginationDto ) {
        return this.rolService.findAll(paginationDto);
    }

    @Post('/store')
    store(@Body() createMateriaDto: CreateRolDto) {
        return this.rolService.store(createMateriaDto);
    }

    @Get('/edit/:idtiporol')
    edit(@Param('idtiporol') id: string) {
        return this.rolService.edit(id);
    }

    @Get('/show/:idtiporol')
    show(@Param('idtiporol') id: string) {
        return this.rolService.show(id);
    }

    @Put('/update/:idtiporol')
    update(@Param('idtiporol') id: string, @Body() updateMateriaDto: UpdateRolDto) {
        return this.rolService.update(id, updateMateriaDto);
    }

    @Delete('/delete/:idtiporol')
    delete(@Param('idtiporol') id: string) {
        return this.rolService.delete(id);
    }
}
