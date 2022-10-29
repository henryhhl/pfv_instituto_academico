
import { combineReducers } from 'redux';

import { ListModuleReducer } from '../reducers/listModulesReducers';

import { RolReducer } from '../reducers/seguridad/rol.reducer';
import { PermisoReducer } from '../reducers/seguridad/permiso.reducer';
import { TipoRolReducer } from '../reducers/seguridad/tipoRol.reducer';
import { UsuarioReducer } from '../reducers/seguridad/usuario.reducer';
import { TipoPermisoReducer } from '../reducers/seguridad/tipoPermiso.reducer';

import { NivelAcademicoReducer } from '../reducers/nivelAcademicoReducers';
import { ModalidadAcademicaReducer } from '../reducers/modalidadAcademicaReducers';
import { PeriodoReducer } from '../reducers/PeriodoReducers';
import { TipoMateriaReducer } from '../reducers/tipoMateriaReducers';
import { MateriaReducer } from '../reducers/materiaReducers';
import { OfertaAcademicaReducer } from '../reducers/ofertaAcademicaReducers';
import { UnidadNegocioReducer } from '../reducers/unidadNegocioReducers';
import { ColumnModuleReducer } from '../reducers/columnModulesReducers';
import { TipoCiudadReducer } from '../reducers/parametros/tipo_ciudad.reducer';
import { CiudadReducer } from '../reducers/parametros/ciudad.reducer';

import { UnidadAdministrativaReducer } from '../reducers/estructuraacademica/unidad_administrativa.reducer';
import { UnidadAcademicaReducer } from '../reducers/estructuraacademica/unidad_academica.reducer';
import { ProgramaReducer } from '../reducers/estructuraacademica/programa.reducer';
import { PensumReducer } from '../reducers/estructuraacademica/pensum.reducer';
import { ReferenciaContactoReducer } from '../reducers/parametros/referencia_contacto.reducer';
import { ResponsableReducer } from '../reducers/estructuraacademica/responsable.reducer';
import { PaginationModuleReducer } from '../reducers/paginationModule.reducer';
import { TurnoReducer } from '../reducers/estructurainstitucional/turno.reducer';
import { DivisionAcademicaReducer } from '../reducers/estructurainstitucional/division_academica.reducer';
import { InstitucionReducer } from '../reducers/estructurainstitucional/institucion.reducer';
import { GestionPeriodoReducer } from '../reducers/estructurainstitucional/gestion_periodo.reducer';

const RootReducer = combineReducers( {
    Rol: RolReducer,
    Permiso: PermisoReducer,
    TipoRol: TipoRolReducer,
    Usuario: UsuarioReducer,
    TipoPermiso: TipoPermisoReducer,

    PaginationModule: PaginationModuleReducer,
    ListModule: ListModuleReducer,
    ColumnModule: ColumnModuleReducer,

    NivelAcademico: NivelAcademicoReducer,
    ModalidadAcademica: ModalidadAcademicaReducer,
    Periodo: PeriodoReducer,
    TipoMateria: TipoMateriaReducer,
    Materia: MateriaReducer,
    OfertaAcademica: OfertaAcademicaReducer,
    UnidadNegocio: UnidadNegocioReducer,
    TipoCiudad: TipoCiudadReducer,
    Ciudad: CiudadReducer,
    ReferenciaContacto: ReferenciaContactoReducer,

    UnidadAdministrativa: UnidadAdministrativaReducer,
    UnidadAcademica: UnidadAcademicaReducer,
    Programa: ProgramaReducer,
    Pensum: PensumReducer,
    Responsable: ResponsableReducer,

    Turno: TurnoReducer,
    DivisionAcademica: DivisionAcademicaReducer,
    Institucion: InstitucionReducer,
    GestionPeriodo: GestionPeriodoReducer,
} );

export default RootReducer;