import { Controller, Get, Query, Param } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { Auth } from '../../auth/decorators/auth.decorator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Controller('bitacora')
export class BitacoraController {
  constructor(private readonly bitacoraService: BitacoraService) {}

  @Get('/index')
  @Auth( /**  N Permissions */ )
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.bitacoraService.findAll(paginationDto);
  }

  @Get('/show/:idbitacora')
  @Auth( /**  N Permissions */ )
  show(@Param('idbitacora') idbitacora: string) {
    return this.bitacoraService.show(idbitacora);
  }

}
