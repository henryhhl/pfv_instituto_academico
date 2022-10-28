import { Injectable } from '@nestjs/common';
import { TipoRolService } from '../module/seguridad/tiporol/tiporol.service';
import { TIPOROL_SEED } from './data/tipoRol.seed';
import { TipoPermisoService } from '../module/seguridad/tipopermiso/tipopermiso.service';
import { TIPOPERMISO_SEED } from './data/tipoPermiso.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly tipoRolService: TipoRolService,
    private readonly tipoPermisoService: TipoPermisoService,
  ) {}

  runSeed() {
    return `This action returns all seed`;
  }
}
