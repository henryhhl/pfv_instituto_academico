import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnidadadministrativaService } from './unidadadministrativa.service';
import { CreateUnidadadministrativaDto } from './dto/create-unidadadministrativa.dto';
import { UpdateUnidadadministrativaDto } from './dto/update-unidadadministrativa.dto';

@Controller('unidadadministrativa')
export class UnidadadministrativaController {
  constructor(private readonly unidadadministrativaService: UnidadadministrativaService) {}

  @Post()
  create(@Body() createUnidadadministrativaDto: CreateUnidadadministrativaDto) {
    return this.unidadadministrativaService.create(createUnidadadministrativaDto);
  }

  @Get()
  findAll() {
    return this.unidadadministrativaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadadministrativaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadadministrativaDto: UpdateUnidadadministrativaDto) {
    return this.unidadadministrativaService.update(+id, updateUnidadadministrativaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadadministrativaService.remove(+id);
  }
}
