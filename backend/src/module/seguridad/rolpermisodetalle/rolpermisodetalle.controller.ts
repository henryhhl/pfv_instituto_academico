import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolPermisoDetalleService } from './rolpermisodetalle.service';
import { CreateRolpermisodetalleDto } from './dto/create-rolpermisodetalle.dto';
import { UpdateRolpermisodetalleDto } from './dto/update-rolpermisodetalle.dto';

@Controller('rolpermisodetalle')
export class RolPermisoDetalleController {
  constructor(private readonly rolpermisodetalleService: RolPermisoDetalleService) {}

  @Get()
  findAll() {
    return this.rolpermisodetalleService.findAll();
  }

  @Post()
  create(@Body() createRolpermisodetalleDto: CreateRolpermisodetalleDto) {
    return this.rolpermisodetalleService.create(createRolpermisodetalleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolpermisodetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolpermisodetalleDto: UpdateRolpermisodetalleDto) {
    return this.rolpermisodetalleService.update(+id, updateRolpermisodetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolpermisodetalleService.remove(+id);
  }
}
