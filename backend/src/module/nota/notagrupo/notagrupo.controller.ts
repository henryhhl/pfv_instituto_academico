import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotagrupoService } from './notagrupo.service';
import { CreateNotaGrupoDto } from './dto/create-notagrupo.dto';
import { UpdateNotagrupoDto } from './dto/update-notagrupo.dto';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('notagrupo')
export class NotagrupoController {
  constructor(private readonly notagrupoService: NotagrupoService) {}

  @Post()
  create(@Body() createNotagrupoDto: CreateNotaGrupoDto) {
    return this.notagrupoService.create(createNotagrupoDto);
  }

  @Get()
  findAll() {
    return this.notagrupoService.findAll();
  }

  @Get(':idnotagrupo')
  findOne(@Param('idnotagrupo') idnotagrupo: string) {
    return this.notagrupoService.findOne(idnotagrupo);
  }

  @Patch(':idnotagrupo')
  update(@Param('idnotagrupo') idnotagrupo: string, @Body() updateNotagrupoDto: UpdateNotagrupoDto) {
    return this.notagrupoService.update(updateNotagrupoDto);
  }

  @Put('/update')
  @Auth( /**  N Permissions */ )
  updatePut(@Body() createNotaCursoDto: CreateNotaGrupoDto) {
    return this.notagrupoService.update(createNotaCursoDto);
  }

  @Delete(':idnotagrupo')
  remove(@Param('idnotagrupo') idnotagrupo: string) {
    return this.notagrupoService.remove(+idnotagrupo);
  }
}
