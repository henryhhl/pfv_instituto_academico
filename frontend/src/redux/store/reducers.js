
import { combineReducers } from 'redux';

import { ColumnModuleReducer } from '../reducers/columnModulesReducers';
import { ListModuleReducer } from '../reducers/listModulesReducers';
import { PaginationModuleReducer } from '../reducers/paginationModule.reducer';

import { PermisoReducer } from '../reducers/seguridad/permiso.reducer';
import { RolReducer } from '../reducers/seguridad/rol.reducer';
import { TipoPermisoReducer } from '../reducers/seguridad/tipoPermiso.reducer';
import { TipoRolReducer } from '../reducers/seguridad/tipoRol.reducer';
import { UsuarioReducer } from '../reducers/seguridad/usuario.reducer';

import { CiudadReducer } from '../reducers/parametros/ciudad.reducer';
import { MateriaReducer } from '../reducers/parametros/materia.reducer';
import { ModalidadAcademicaReducer } from '../reducers/parametros/modalidad_academica.reducer';
import { NivelAcademicoReducer } from '../reducers/parametros/nivel_academico.reducer';
import { OfertaAcademicaReducer } from '../reducers/parametros/oferta_academica.reducer';
import { PeriodoReducer } from '../reducers/parametros/periodo.reducer';
import { TipoCiudadReducer } from '../reducers/parametros/tipo_ciudad.reducer';
import { TipoMateriaReducer } from '../reducers/parametros/tipo_materia.reducer';
import { UnidadNegocioReducer } from '../reducers/parametros/unidad_negocio.reducer';

import { ProgramaReducer } from '../reducers/estructuraacademica/programa.reducer';
import { PensumReducer } from '../reducers/estructuraacademica/pensum.reducer';
import { TipoContactoReducer } from '../reducers/oportunidad/tipocontacto.reducer';
import { ResponsableReducer } from '../reducers/estructuraacademica/responsable.reducer';
import { UnidadAdministrativaReducer } from '../reducers/estructuraacademica/unidad_administrativa.reducer';
import { UnidadAcademicaReducer } from '../reducers/estructuraacademica/unidad_academica.reducer';

import { DivisionAcademicaReducer } from '../reducers/estructurainstitucional/division_academica.reducer';
import { GestionPeriodoReducer } from '../reducers/estructurainstitucional/gestion_periodo.reducer';
import { InstitucionReducer } from '../reducers/estructurainstitucional/institucion.reducer';
import { TurnoReducer } from '../reducers/estructurainstitucional/turno.reducer';

import { TipoIdentificacionReducer } from '../reducers/persona/tipo_identificacion.reducer';
import { LoadingReducer } from '../reducers/loading.reducer';
import { CargoReducer } from '../reducers/persona/cargo.reducer';
import { DocenteReducer } from '../reducers/persona/docente.reducer';
import { AdministrativoReducer } from '../reducers/persona/administrativo.reducer';
import { CategoriaDocumentoReducer } from '../reducers/persona/categoria_documento.reducer';
import { AulaReducer } from '../reducers/estructurainstitucional/aula.reducer';
import { EstudianteReducer } from '../reducers/persona/estudiante.reducer';
import { LoginReducer } from '../reducers/auth/login.reducer';
import { SesionReducer } from '../reducers/sesion.reducer';
import { RegisterReducer } from '../reducers/auth/register.reducer';
import { CursoReducer } from '../reducers/ofertaacademica/curso.reducer';
import { CursoHorarioReducer } from '../reducers/ofertaacademica/curso_horario.reducer';
import { MotivoAperturaCierreCursoReducer } from '../reducers/ofertaacademica/motivoaperturacierrecurso.reducer';
import { GrupoReducer } from '../reducers/ofertaacademica/grupo.reducer';
import { TipoActividadReducer } from '../reducers/oportunidad/tipoactividad.reducer';
import { TipoMedioPublicitarioReducer } from '../reducers/oportunidad/tipomediopublicitario.reducer';
import { EstadoNegocioReducer } from '../reducers/oportunidad/estadonegocio.reducer';
import { AsesorResponsableReducer } from '../reducers/oportunidad/asesorresponsable.reducer';
import { NegocioReducer } from '../reducers/oportunidad/negocio.reducer';
import { ActividadReducer } from '../reducers/oportunidad/actividad.reducer';
import { OportunidadReducer } from '../reducers/oportunidad/oportunidad.reducer';
import { TipoResultadoReducer } from '../reducers/oportunidad/tiporesultado.reducer';
import { InscripcionProgramaReducer } from '../reducers/inscripcion/inscripcionprograma.reducer';
import { InscripcionCursoReducer } from '../reducers/inscripcion/inscripcioncurso.reducer';
import { InscripcionGrupoReducer } from '../reducers/inscripcion/inscripciongrupo.reducer';
import { ProfileReducer } from '../reducers/auth/profile.reducer';
import { BitacoraReducer } from '../reducers/seguridad/bitacora.reducer';

const RootReducer = combineReducers( {
    Login: LoginReducer,
    Register: RegisterReducer,
    Sesion: SesionReducer,
    Profile: ProfileReducer,
    
    Bitacora: BitacoraReducer,
    Rol: RolReducer,
    Permiso: PermisoReducer,
    TipoPermiso: TipoPermisoReducer,
    TipoRol: TipoRolReducer,
    Usuario: UsuarioReducer,

    ColumnModule: ColumnModuleReducer,
    ListModule: ListModuleReducer,
    PaginationModule: PaginationModuleReducer,

    Loading: LoadingReducer,

    Ciudad: CiudadReducer,
    Materia: MateriaReducer,
    ModalidadAcademica: ModalidadAcademicaReducer,
    NivelAcademico: NivelAcademicoReducer,
    OfertaAcademica: OfertaAcademicaReducer,
    Periodo: PeriodoReducer,
    TipoCiudad: TipoCiudadReducer,
    TipoMateria: TipoMateriaReducer,
    UnidadNegocio: UnidadNegocioReducer,

    Programa: ProgramaReducer,
    Pensum: PensumReducer,
    Responsable: ResponsableReducer,
    UnidadAcademica: UnidadAcademicaReducer,
    UnidadAdministrativa: UnidadAdministrativaReducer,

    Aula: AulaReducer,
    DivisionAcademica: DivisionAcademicaReducer,
    GestionPeriodo: GestionPeriodoReducer,
    Institucion: InstitucionReducer,
    Turno: TurnoReducer,
    
    Administrativo: AdministrativoReducer,
    Cargo: CargoReducer,
    CategoriaDocumento: CategoriaDocumentoReducer,
    Docente: DocenteReducer,
    Estudiante: EstudianteReducer,
    TipoIdentificacion: TipoIdentificacionReducer,

    Curso: CursoReducer,
    CursoHorario: CursoHorarioReducer,
    MotivoAperturaCierreCurso: MotivoAperturaCierreCursoReducer,
    Grupo: GrupoReducer,

    TipoActividad: TipoActividadReducer,
    TipoMedioPublicitario: TipoMedioPublicitarioReducer,
    TipoContacto: TipoContactoReducer,
    EstadoNegocio: EstadoNegocioReducer,
    TipoResultado: TipoResultadoReducer,
    AsesorResponsable: AsesorResponsableReducer,
    Negocio: NegocioReducer,
    Actividad: ActividadReducer,
    Oportunidad: OportunidadReducer,


    InscripcionPrograma: InscripcionProgramaReducer,
    InscripcionCurso: InscripcionCursoReducer,
    InscripcionGrupo: InscripcionGrupoReducer,
} );

export default RootReducer;