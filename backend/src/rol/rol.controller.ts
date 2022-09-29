import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('/create')
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get('/index')
  findAll() {
    return this.rolService.findAll();
  }

  @Get('/show/:idrol')
  findOne(@Param('idrol') id: string) {
    return this.rolService.findOne(id);
  }

  @Patch('/update/:idrol')
  update(@Param('idrol') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete('/delete/:idrol')
  remove(@Param('idrol') id: string) {
    return this.rolService.remove(id);
  }
}
