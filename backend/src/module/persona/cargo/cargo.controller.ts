import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get('/index')
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.cargoService.findAll(paginationDto);
  }

  @Post('/store')
  store(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.store(createCargoDto);
  }

  @Get('/edit/:idcargo')
  edit(@Param('idcargo') idcargo: string) {
    return this.cargoService.edit(idcargo);
  }

  @Get('/show/:idcargo')
  show(@Param('idcargo') idcargo: string) {
    return this.cargoService.show(idcargo);
  }

  @Patch('/update/:idcargo')
  updatePatch(@Param('idcargo') idcargo: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(idcargo, updateCargoDto);
  }

  @Put('/update/:idcargo')
  updatePut(@Param('idcargo') idcargo: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(idcargo, updateCargoDto);
  }

  @Delete('/delete/:idcargo')
  delete(@Param('idcargo') idcargo: string) {
    return this.cargoService.delete(idcargo);
  }
}
