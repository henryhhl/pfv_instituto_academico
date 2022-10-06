
import { combineReducers } from 'redux';

import { ListModuleReducer } from '../reducers/listModulesReducers';
import { TipoRolReducer } from '../reducers/tipoRolReducers';
import { RolReducer } from '../reducers/rolReducers';
import { TipoPermisoReducer } from '../reducers/tipoPermisoReducers';
import { UsuarioReducer } from '../reducers/usuarioReducers';
import { NivelAcademicoReducer } from '../reducers/nivelAcademicoReducers';
import { ModalidadAcademicaReducer } from '../reducers/modalidadAcademicaReducers';
import { PeriodoReducer } from '../reducers/PeriodoReducers';
import { TipoMateriaReducer } from '../reducers/tipoMateriaReducers';
import { MateriaReducer } from '../reducers/materiaReducers';
import { OfertaAcademicaReducer } from '../reducers/ofertaAcademicaReducers';
import { UnidadNegocioReducer } from '../reducers/unidadNegocioReducers';
import { ColumnModuleReducer } from '../reducers/columnModulesReducers';

const RootReducer = combineReducers( {
    ListModule: ListModuleReducer,
    ColumnModule: ColumnModuleReducer,
    TipoRol: TipoRolReducer,
    TipoPermiso: TipoPermisoReducer,
    Rol: RolReducer,
    Usuario: UsuarioReducer,
    NivelAcademico: NivelAcademicoReducer,
    ModalidadAcademica: ModalidadAcademicaReducer,
    Periodo: PeriodoReducer,
    TipoMateria: TipoMateriaReducer,
    Materia: MateriaReducer,
    OfertaAcademica: OfertaAcademicaReducer,
    UnidadNegocio: UnidadNegocioReducer,
} );

export default RootReducer;