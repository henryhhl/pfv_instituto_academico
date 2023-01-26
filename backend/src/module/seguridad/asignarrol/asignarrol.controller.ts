import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { AsignarRolService } from './asignarrol.service';
import { AsignarRolPaginationDto } from './dto/pagination.dto';
import { CreateAsignarRolDto } from './dto/create-asignarrol.dto';
import { UpdateAsignarRolDto } from './dto/update-asignarrol.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('asignarrol')
export class AsignarRolController {
  constructor(private readonly asignarrolService: AsignarRolService) {}


  @Get('index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: AsignarRolPaginationDto ) {
    return this.asignarrolService.findAll(paginationDto);
  }
  
  @Post('/asignar')
  @Auth( /**  N Permissions */ )
  asignar(@Body() createAsignarrolDto: CreateAsignarRolDto) {
    return this.asignarrolService.asignar(createAsignarrolDto);
  }

  @Patch('/update/:idasignarrol')
  @Auth( /**  N Permissions */ )
  update(@Param('idasignarrol') idasignarrol: string, @Body() updateAsignarrolDto: UpdateAsignarRolDto) {
    return this.asignarrolService.update(idasignarrol, updateAsignarrolDto);
  }

  @Put('/update/:idasignarrol')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idasignarrol') idasignarrol: string, @Body() updateAsignarrolDto: UpdateAsignarRolDto) {
    return this.asignarrolService.update(idasignarrol, updateAsignarrolDto);
  }

  @Delete('/delete/:idasignarrol')
  @Auth( /**  N Permissions */ )
  delete(@Param('idasignarrol') idasignarrol: string) {
    return this.asignarrolService.delete(idasignarrol);
  }

}
