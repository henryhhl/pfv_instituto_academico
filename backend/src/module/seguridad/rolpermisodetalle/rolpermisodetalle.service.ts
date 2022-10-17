import { Injectable } from '@nestjs/common';
import { PermisoService } from '../permiso/permiso.service';
import { CreateRolpermisodetalleDto } from './dto/create-rolpermisodetalle.dto';
import { UpdateRolpermisodetalleDto } from './dto/update-rolpermisodetalle.dto';
import { RolPermisoDetalle } from './entities/rolpermisodetalle.entity';

@Injectable()
export class RolPermisoDetalleService {
  private listRolPermisoDetalle: RolPermisoDetalle[] = [];

  constructor(
    private readonly permisoService: PermisoService,
  ) {}

  findAll() {
    return `This action returns all rolpermisodetalle`;
  }

  getPermiso( idrol: String ) {
    let listPermiso = this.listRolPermisoDetalle.filter( 
      (rolpermiso) => rolpermiso.fkidrol === idrol 
    );
  }

  create(createRolpermisodetalleDto: CreateRolpermisodetalleDto) {
    return 'This action adds a new rolpermisodetalle';
  }

  findOne(id: number) {
    return `This action returns a #${id} rolpermisodetalle`;
  }

  update(id: number, updateRolpermisodetalleDto: UpdateRolpermisodetalleDto) {
    return `This action updates a #${id} rolpermisodetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolpermisodetalle`;
  }
}
