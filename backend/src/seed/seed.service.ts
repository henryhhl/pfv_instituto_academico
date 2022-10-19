import { Injectable } from '@nestjs/common';
import { TipoRolService } from '../module/seguridad/tiporol/tiporol.service';
import { TIPOROL_SEED } from './data/tipoRol.seed';
import { TipoPermisoService } from '../module/seguridad/tipopermiso/tipopermiso.service';
import { TIPOPERMISO_SEED } from './data/tipoPermiso.seed';
import { TipoMateriaService } from '../module/parametro/tipomateria/tipomateria.service';
import { TIPOMATERIA_SEED } from './data/tipoMateria.seed';
import { UsuarioService } from '../module/seguridad/usuario/usuario.service';
import { USUARIO_SEED } from './data/usuario.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly tipoRolService: TipoRolService,
    private readonly tipoPermisoService: TipoPermisoService,
    private readonly tipoMateriaService: TipoMateriaService,
    private readonly usuarioService: UsuarioService,
  ) {}

  runSeed() {
    this.tipoRolService.fillTipoRolSeedData( TIPOROL_SEED );
    this.tipoPermisoService.fillTipoPermisoSeedData( TIPOPERMISO_SEED );
    this.tipoMateriaService.fillTipoMateriaSeedData( TIPOMATERIA_SEED );
    this.usuarioService.fillUsuarioSeedData( USUARIO_SEED );
    return `This action returns all seed`;
  }
}
