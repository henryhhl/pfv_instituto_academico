import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PensumService } from './pensum.service';
import { CreatePensumDto } from './dto/create-pensum.dto';
import { UpdatePensumDto } from './dto/update-pensum.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { Usuario } from '../../seguridad/usuario/entities/usuario.entity';
import { AuthService } from '../../auth/auth.service';

@Controller('pensum')
export class PensumController {
  constructor(
    private readonly pensumService: PensumService,
    private readonly authService: AuthService
  ) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    // const checkAuth = await this.authService.checkAuthToken(user);
    // if ( checkAuth.resp === 1 && checkAuth.error === false ) {
    //   const result = await this.pensumService.findAll(paginationDto);
    //   result['token'] = checkAuth.token;
    //   result['usuario'] = checkAuth.usuario;
    //   return result;
    // } else {
    //   return checkAuth;
    // }
    return this.pensumService.findAll(paginationDto);
  }

  @Post('/store')
  @Auth( /**  N Permissions */ )
  store(@Body() createPensumDto: CreatePensumDto) {
    return this.pensumService.store(createPensumDto);
  }

  @Get('/show/:idpensum')
  @Auth( /**  N Permissions */ )
  show(@Param('idpensum') id: string) {
    return this.pensumService.show(id);
  }

  @Get('/edit/:idpensum')
  @Auth( /**  N Permissions */ )
  edit(@Param('idpensum') id: string) {
    return this.pensumService.edit(id);
  }

  @Patch('/update/:idpensum')
  @Auth( /**  N Permissions */ )
  updatePatch(@Param('idpensum') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumService.update(id, updatePensumDto);
  }

  @Put('/update/:idpensum')
  @Auth( /**  N Permissions */ )
  updatePut(@Param('idpensum') id: string, @Body() updatePensumDto: UpdatePensumDto) {
    return this.pensumService.update(id, updatePensumDto);
  }

  @Delete('/delete/:idpensum')
  @Auth( /**  N Permissions */ )
  delete(@Param('idpensum') id: string) {
    return this.pensumService.delete(id);
  }
}
