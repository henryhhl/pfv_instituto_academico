import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PensumService } from './pensum.service';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';

@Controller('pensum')
export class PensumController {
  constructor(private readonly pensumService: PensumService) {}

  @Get('/index')
  findAll() {
    return this.pensumService.findAll();
  }

  @Post('/store')
  store(@Body() createPensumDto: CreatePensumDto) {
    return this.pensumService.store(createPensumDto);
  }

  @Get('/show/:idpensum')
  show(@Param('idpensum') id: string) {
    return this.pensumService.show(id);
  }

  @Get('/edit/:idpensum')
  edit(@Param('idpensum') id: string) {
    return this.pensumService.edit(id);
  }

  @Patch('/update/:idpensum')
  updatePatch(@Param('idpensum') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumService.update(id, updatePensumDto);
  }

  @Put('/update/:idpensum')
  updatePut(@Param('idpensum') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumService.update(id, updatePensumDto);
  }

  @Delete('/delete/:idpensum')
  remove(@Param('idpensum') id: string) {
    return this.pensumService.remove(id);
  }
}
