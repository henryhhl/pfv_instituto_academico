

import { Routes, Route } from 'react-router-dom';
import InicioPage from '../screens/inicioPage';
import AppMain from '../layouts/app';

import Error404 from '../errors/errors404';

import IndexBitacora from '../screens/modules/seguridad/bitacora/bitacora.index';
import ShowBitacora from '../screens/modules/seguridad/bitacora/bitacora.show';

import IndexTipoRol from '../screens/modules/seguridad/tiporol/tipo_rol.index';
import CreateTipoRol from '../screens/modules/seguridad/tiporol/tipo_rol.create';
import EditTipoRol from '../screens/modules/seguridad/tiporol/tipo_rol.edit';
import ShowTipoRol from '../screens/modules/seguridad/tiporol/tipo_rol.show';

import IndexTipoPermiso from '../screens/modules/seguridad/tipopermiso/tipo_permiso.index';
import CreateTipoPermiso from '../screens/modules/seguridad/tipopermiso/tipo_permiso.create';
import EditTipoPermiso from '../screens/modules/seguridad/tipopermiso/tipo_permiso.edit';
import ShowTipoPermiso from '../screens/modules/seguridad/tipopermiso/tipo_permiso.show';

import IndexRol from '../screens/modules/seguridad/rol/rol.index';
import CreateRol from '../screens/modules/seguridad/rol/rol.create';
import EditRol from '../screens/modules/seguridad/rol/rol.edit';
import ShowRol from '../screens/modules/seguridad/rol/rol.show';

import IndexPermiso from '../screens/modules/seguridad/permiso/permiso.index';
import IndexAsignarRol from '../screens/modules/seguridad/asignarrol.index';
import AsignarPermiso from '../screens/modules/seguridad/asignar_permiso';

import IndexUsuario from '../screens/modules/seguridad/usuario/usuario.index';
import CreateUsuario from '../screens/modules/seguridad/usuario/usuario.create';
import EditUsuario from '../screens/modules/seguridad/usuario/usuario.edit';
import ShowUsuario from '../screens/modules/seguridad/usuario/usuario.show';

import IndexNivelAcademico from '../screens/modules/parametro/nivelacademico/nivel_academico.index';
import CreateNivelAcademico from '../screens/modules/parametro/nivelacademico/nivel_academico.create';
import EditNivelAcademico from '../screens/modules/parametro/nivelacademico/nivel_academico.edit';
import ShowNivelAcademico from '../screens/modules/parametro/nivelacademico/nivel_academico.show';

import IndexModalidadAcademica from '../screens/modules/parametro/modalidad/modalidad_academica.index';
import CreateModalidadAcademica from '../screens/modules/parametro/modalidad/modalidad_academica.create';
import EditModalidadAcademica from '../screens/modules/parametro/modalidad/modalidad_academica.edit';
import ShowModalidadAcademica from '../screens/modules/parametro/modalidad/modalidad_academica.show';

import IndexPeriodo from '../screens/modules/parametro/periodo/periodo.index';
import CreatePeriodo from '../screens/modules/parametro/periodo/periodo.create';
import EditPeriodo from '../screens/modules/parametro/periodo/periodo.edit';
import ShowPeriodo from '../screens/modules/parametro/periodo/periodo.show';

import IndexTipoMateria from '../screens/modules/parametro/tipomateria/tipo_materia.index';
import CreateTipoMateria from '../screens/modules/parametro/tipomateria/tipo_materia.create';
import EditTipoMateria from '../screens/modules/parametro/tipomateria/tipo_materia.edit';
import ShowTipoMateria from '../screens/modules/parametro/tipomateria/tipo_materia.show';

import IndexMateria from '../screens/modules/parametro/materia/materia.index';
import CreateMateria from '../screens/modules/parametro/materia/materia.create';
import EditMateria from '../screens/modules/parametro/materia/materia.edit';
import ShowMateria from '../screens/modules/parametro/materia/materia.show';

import IndexTipoCiudad from '../screens/modules/parametro/tipociudad/tipo_ciudad.index';
import CreateTipoCiudad from '../screens/modules/parametro/tipociudad/tipo_ciudad.create';
import EditTipoCiudad from '../screens/modules/parametro/tipociudad/tipo_ciudad.edit';
import ShowTipoCiudad from '../screens/modules/parametro/tipociudad/tipo_ciudad.show';

import IndexCiudad from '../screens/modules/parametro/ciudad/indexCiudad';

import IndexOfertaAcademica from '../screens/modules/parametro/ofertaacademica/oferta_academica.index';
import CreateOfertaAcademica from '../screens/modules/parametro/ofertaacademica/oferta_academica.create';
import EditOfertaAcademica from '../screens/modules/parametro/ofertaacademica/oferta_academica.edit';
import ShowOfertaAcademica from '../screens/modules/parametro/ofertaacademica/oferta_academica.show';

import IndexUnidadNegocio from '../screens/modules/parametro/unidadnegocio/unidad_negocio.index';
import CreateUnidadNegocio from '../screens/modules/parametro/unidadnegocio/unidad_negocio.create';
import EditUnidadNegocio from '../screens/modules/parametro/unidadnegocio/unidad_negocio.edit';
import ShowUnidadNegocio from '../screens/modules/parametro/unidadnegocio/unidad_negocio.show';

import IndexUnidadAdministrativa from '../screens/modules/estructuraacademica/unidadadministrativa/unidad_administrativa.index';
import CreateUnidadAdministrativa from '../screens/modules/estructuraacademica/unidadadministrativa/unidad_administrativa.create';
import ShowUnidadAdministrativa from '../screens/modules/estructuraacademica/unidadadministrativa/unidad_administrativa.show';
import EditUnidadAdministrativa from '../screens/modules/estructuraacademica/unidadadministrativa/unidad_administrativa.edit';

import IndexUnidadAcademica from '../screens/modules/estructuraacademica/unidadacademica/unidadacademica.index';
import CreateUnidadAcademica from '../screens/modules/estructuraacademica/unidadacademica/unidad_academica.create';
import ShowUnidadAcademica from '../screens/modules/estructuraacademica/unidadacademica/unidad_academica.show';
import EditUnidadAcademica from '../screens/modules/estructuraacademica/unidadacademica/unidad_academica.edit';

import IndexPrograma from '../screens/modules/estructuraacademica/programa/programa.index';
import CreatePrograma from '../screens/modules/estructuraacademica/programa/programa.create';
import ShowPrograma from '../screens/modules/estructuraacademica/programa/programa.show';
import EditPrograma from '../screens/modules/estructuraacademica/programa/programa.edit';

import IndexPensum from '../screens/modules/estructuraacademica/pensum/pensum.index';
import CreatePensum from '../screens/modules/estructuraacademica/pensum/pensum.create';
import ShowPensum from '../screens/modules/estructuraacademica/pensum/pensum.show';
import EditPensum from '../screens/modules/estructuraacademica/pensum/pensum.edit';

import IndexResponsable from '../screens/modules/estructuraacademica/responsable/responsable.index';
import CreateResponsable from '../screens/modules/estructuraacademica/responsable/responsable.create';
import ShowResponsable from '../screens/modules/estructuraacademica/responsable/responsable.show';
import EditResponsable from '../screens/modules/estructuraacademica/responsable/responsable.edit';

import IndexTurno from '../screens/modules/estructurainstitucional/turno/turno.index';
import CreateTurno from '../screens/modules/estructurainstitucional/turno/turno.create';
import ShowTurno from '../screens/modules/estructurainstitucional/turno/turno.show';
import EditTurno from '../screens/modules/estructurainstitucional/turno/turno.edit';

import IndexAula from '../screens/modules/estructurainstitucional/aula/aula.index';
import CreateAula from '../screens/modules/estructurainstitucional/aula/aula.create';
import ShowAula from '../screens/modules/estructurainstitucional/aula/aula.show';
import EditAula from '../screens/modules/estructurainstitucional/aula/aula.edit';

import IndexDivisionAcademica from '../screens/modules/estructurainstitucional/divisionacademica/division_academica.index';
import CreateDivisionAcademica from '../screens/modules/estructurainstitucional/divisionacademica/division_academica.create';
import ShowDivisionAcademica from '../screens/modules/estructurainstitucional/divisionacademica/division_academica.show';
import EditDivisionAcademica from '../screens/modules/estructurainstitucional/divisionacademica/division_academica.edit';

import IndexInstitucion from '../screens/modules/estructurainstitucional/institucion/institucion.index';
import CreateInstitucion from '../screens/modules/estructurainstitucional/institucion/institucion.create';
import ShowInstitucion from '../screens/modules/estructurainstitucional/institucion/institucion.show';
import EditInstitucion from '../screens/modules/estructurainstitucional/institucion/institucion.edit';

import IndexGestionPeriodo from '../screens/modules/estructurainstitucional/gestionperiodo/gestion_periodo.index';
import CreateGestionPeriodo from '../screens/modules/estructurainstitucional/gestionperiodo/gestion_periodo.create';
import ShowGestionPeriodo from '../screens/modules/estructurainstitucional/gestionperiodo/gestion_periodo.show';
import EditGestionPeriodo from '../screens/modules/estructurainstitucional/gestionperiodo/gestion_periodo.edit';


import IndexTipoIdentificacion from '../screens/modules/persona/tipoidentificacion/tipo_identificacion.index';
import CreateTipoIdentificacion from '../screens/modules/persona/tipoidentificacion/tipo_identificacion.create';
import ShowTipoIdentificacion from '../screens/modules/persona/tipoidentificacion/tipo_identificacion.show';
import EditTipoIdentificacion from '../screens/modules/persona/tipoidentificacion/tipo_identificacion.edit';

import IndexCategoriaDocumento from '../screens/modules/persona/categoriadocumento/categoria_documento.index';
import CreateCategoriaDocumento from '../screens/modules/persona/categoriadocumento/categoria_documento.create';
import ShowCategoriaDocumento from '../screens/modules/persona/categoriadocumento/categoria_documento.show';
import EditCategoriaDocumento from '../screens/modules/persona/categoriadocumento/categoria_documento.edit';

import IndexCargo from '../screens/modules/persona/cargo/cargo.index';
import CreateCargo from '../screens/modules/persona/cargo/cargo.create';
import ShowCargo from '../screens/modules/persona/cargo/cargo.show';
import EditCargo from '../screens/modules/persona/cargo/cargo.edit';

import IndexDocente from '../screens/modules/persona/docente/docente.index';
import CreateDocente from '../screens/modules/persona/docente/docente.create';
import ShowDocente from '../screens/modules/persona/docente/docente.show';
import EditDocente from '../screens/modules/persona/docente/docente.edit';

import IndexEstudiante from '../screens/modules/persona/estudiante/estudiante.index';
import CreateEstudiante from '../screens/modules/persona/estudiante/estudiante.create';
import ShowEstudiante from '../screens/modules/persona/estudiante/estudiante.show';
import EditEstudiante from '../screens/modules/persona/estudiante/estudiante.edit';

import IndexAdministrativo from '../screens/modules/persona/administrativo/administrativo.index';
import CreateAdministrativo from '../screens/modules/persona/administrativo/administrativo.create';
import ShowAdministrativo from '../screens/modules/persona/administrativo/administrativo.show';
import EditAdministrativo from '../screens/modules/persona/administrativo/administrativo.edit';


import IndexCurso from '../screens/modules/ofertaacademica/curso/curso.index';
import CreateCurso from '../screens/modules/ofertaacademica/curso/curso.create';
import ShowCurso from '../screens/modules/ofertaacademica/curso/curso.show';
import EditCurso from '../screens/modules/ofertaacademica/curso/curso.edit';

import IndexCursoHorario from '../screens/modules/ofertaacademica/horario/horario.index';

import IndexMotivoAperturaCierreCurso from '../screens/modules/ofertaacademica/motivoaperturacierrecurso/motivoaperturacierrecurso.index';
import CreateMotivoAperturaCierreCurso from '../screens/modules/ofertaacademica/motivoaperturacierrecurso/motivoaperturacierrecurso.create';
import ShowMotivoAperturaCierreCurso from '../screens/modules/ofertaacademica/motivoaperturacierrecurso/motivoaperturacierrecurso.show';
import EditMotivoAperturaCierreCurso from '../screens/modules/ofertaacademica/motivoaperturacierrecurso/motivoaperturacierrecurso.edit';

import IndexAperturaCierreCurso from '../screens/modules/ofertaacademica/aperturacierrecurso/aperturacierrecurso.index';

import IndexCierreCurso from '../screens/modules/ofertaacademica/cierrecurso/cierrecurso.index';

import IndexGrupo from '../screens/modules/ofertaacademica/grupo/grupo.index';
import CreateGrupo from '../screens/modules/ofertaacademica/grupo/grupo.create';
import ShowGrupo from '../screens/modules/ofertaacademica/grupo/grupo.show';
import EditGrupo from '../screens/modules/ofertaacademica/grupo/grupo.edit';


import IndexTipoActividad from '../screens/modules/oportunidad/tipoactividad/tipoactividad.index';
import CreateTipoActividad from '../screens/modules/oportunidad/tipoactividad/tipoactividad.create';
import ShowTipoActividad from '../screens/modules/oportunidad/tipoactividad/tipoactividad.show';
import EditTipoActividad from '../screens/modules/oportunidad/tipoactividad/tipoactividad.edit';

import IndexTipoMedioPublicitario from '../screens/modules/oportunidad/tipomediopublicitario/tipomediopublicitario.index';
import CreateTipoMedioPublicitario from '../screens/modules/oportunidad/tipomediopublicitario/tipomediopublicitario.create';
import ShowTipoMedioPublicitario from '../screens/modules/oportunidad/tipomediopublicitario/tipomediopublicitario.show';
import EditTipoMedioPublicitario from '../screens/modules/oportunidad/tipomediopublicitario/tipomediopublicitario.edit';

import IndexTipoContacto from '../screens/modules/oportunidad/tipocontacto/tipocontacto.index';
import CreateTipoContacto from '../screens/modules/oportunidad/tipocontacto/tipocontacto.create';
import EditTipoContacto from '../screens/modules/oportunidad/tipocontacto/tipocontacto.edit';
import ShowTipoContacto from '../screens/modules/oportunidad/tipocontacto/tipocontacto.show';

import IndexEstadoNegocio from '../screens/modules/oportunidad/estadonegocio/estadonegocio.index';
import CreateEstadoNegocio from '../screens/modules/oportunidad/estadonegocio/estadonegocio.create';
import EditEstadoNegocio from '../screens/modules/oportunidad/estadonegocio/estadonegocio.edit';
import ShowEstadoNegocio from '../screens/modules/oportunidad/estadonegocio/estadonegocio.show';

import IndexAsesorResponsable from '../screens/modules/oportunidad/asesorresponsable/asesorresponsable.index';
import CreateAsesorResponsable from '../screens/modules/oportunidad/asesorresponsable/asesorresponsable.create';
import EditAsesorResponsable from '../screens/modules/oportunidad/asesorresponsable/asesorresponsable.edit';
import ShowAsesorResponsable from '../screens/modules/oportunidad/asesorresponsable/asesorresponsable.show';

import IndexNegocio from '../screens/modules/oportunidad/negocio/negocio.index';
import CreateNegocio from '../screens/modules/oportunidad/negocio/negocio.create';
import EditNegocio from '../screens/modules/oportunidad/negocio/negocio.edit';
import ShowNegocio from '../screens/modules/oportunidad/negocio/negocio.show';

import IndexActividad from '../screens/modules/oportunidad/actividad/actividad.index';
import CreateActividad from '../screens/modules/oportunidad/actividad/actividad.create';
import EditActividad from '../screens/modules/oportunidad/actividad/actividad.edit';
import ShowActividad from '../screens/modules/oportunidad/actividad/actividad.show';

import IndexOportunidad from '../screens/modules/oportunidad/oportunidad/oportunidad.index';
import CreateOportunidad from '../screens/modules/oportunidad/oportunidad/oportunidad.create';
import EditOportunidad from '../screens/modules/oportunidad/oportunidad/oportunidad.edit';
import ShowOportunidad from '../screens/modules/oportunidad/oportunidad/oportunidad.show';

import IndexTipoResultado from '../screens/modules/oportunidad/tiporesultado/tiporesultado.index';
import CreateTipoResultado from '../screens/modules/oportunidad/tiporesultado/tiporesultado.create';
import EditTipoResultado from '../screens/modules/oportunidad/tiporesultado/tiporesultado.edit';
import ShowTipoResultado from '../screens/modules/oportunidad/tiporesultado/tiporesultado.show';

import CreateInscripcionPrograma from '../screens/modules/inscripcion/inscripcionprograma/inscripcionprograma.create';
import CreateInscripcionCurso from '../screens/modules/inscripcion/inscripcioncurso/inscripcioncurso.create';
import CreateInscripcionGrupo from '../screens/modules/inscripcion/inscripciongrupo/inscripciongrupo.create';


import IndexParametroCalificacion from '../screens/modules/nota/parametrocalificacion/parametrocalificacion.index';
import CreateParametroCalificacion from '../screens/modules/nota/parametrocalificacion/parametrocalificacion.create';
import EditParametroCalificacion from '../screens/modules/nota/parametrocalificacion/parametrocalificacion.edit';
import ShowParametroCalificacion from '../screens/modules/nota/parametrocalificacion/parametrocalificacion.show';

import IndexCalendarioAcademico from '../screens/modules/nota/calendarioacademico/calendarioacademico.index';

import IndexAsistenciaGrupo from '../screens/modules/nota/asistenciagrupo/asistenciagrupo.index';
import IndexAsistenciaCurso from '../screens/modules/nota/asistencuacurso/asistenciacurso.index';

import IndexNotaCurso from '../screens/modules/nota/notacurso/notacurso.index';
import IndexNotaGrupo from '../screens/modules/nota/notagrupo/notagrupo.index';

import LoginPage from '../screens/auth/login.page';
import ProfilePage from '../screens/profile/profile.screen';

const HomeRoute = (props) => {
    return (
        <>
            <Routes>
                <Route path="/notFound" element={ <InicioPage { ...props } /> }  />
                <Route path="/login" element={ <LoginPage { ...props } /> }  />
                <Route path="/" element={<AppMain />}>
                    <Route index path="/" element={ <InicioPage { ...props } /> }  />
                    <Route index path="/profile" element={ <ProfilePage { ...props } /> }  />

                    <Route index path="/bitacora/index" element={ <IndexBitacora { ...props } /> }  />
                    <Route index path="/bitacora/show/:idbitacora" element={ <ShowBitacora { ...props } /> }  />

                    <Route index path="/tipo_rol/index" element={ <IndexTipoRol { ...props } /> }  />
                    <Route index path="/tipo_rol/create" element={ <CreateTipoRol { ...props } /> }  />
                    <Route index path="/tipo_rol/edit/:idtiporol" element={ <EditTipoRol { ...props } /> }  />
                    <Route index path="/tipo_rol/show/:idtiporol" element={ <ShowTipoRol { ...props } /> }  />

                    <Route index path="/tipo_permiso/index" element={ <IndexTipoPermiso { ...props } /> }  />
                    <Route index path="/tipo_permiso/create" element={ <CreateTipoPermiso { ...props } /> }  />
                    <Route index path="/tipo_permiso/edit/:idtipopermiso" element={ <EditTipoPermiso { ...props } /> }  />
                    <Route index path="/tipo_permiso/show/:idtipopermiso" element={ <ShowTipoPermiso { ...props } /> }  />

                    <Route index path="/rol/index" element={ <IndexRol { ...props } /> }  />
                    <Route index path="/rol/create" element={ <CreateRol { ...props } /> }  />
                    <Route index path="/rol/edit/:idrol" element={ <EditRol { ...props } /> }  />
                    <Route index path="/rol/show/:idrol" element={ <ShowRol { ...props } /> }  />

                    <Route index path="/permiso/index" element={ <IndexPermiso { ...props } /> }  />
                    <Route index path="/asignarrol/index" element={ <IndexAsignarRol { ...props } /> }  />
                    <Route index path="/asignar_permiso" element={ <AsignarPermiso { ...props } /> }  />

                    <Route index path="/usuario/index" element={ <IndexUsuario { ...props } /> }  />
                    <Route index path="/usuario/create" element={ <CreateUsuario { ...props } /> }  />
                    <Route index path="/usuario/edit/:idusuario" element={ <EditUsuario { ...props } /> }  />
                    <Route index path="/usuario/show/:idusuario" element={ <ShowUsuario { ...props } /> }  />

                    <Route index path="/nivelacademico/index" element={ <IndexNivelAcademico { ...props } /> }  />
                    <Route index path="/nivelacademico/create" element={ <CreateNivelAcademico { ...props } /> }  />
                    <Route index path="/nivelacademico/edit/:idnivelacademico" element={ <EditNivelAcademico { ...props } /> }  />
                    <Route index path="/nivelacademico/show/:idnivelacademico" element={ <ShowNivelAcademico { ...props } /> }  />

                    <Route index path="/modalidadacademica/index" element={ <IndexModalidadAcademica { ...props } /> }  />
                    <Route index path="/modalidadacademica/create" element={ <CreateModalidadAcademica { ...props } /> }  />
                    <Route index path="/modalidadacademica/edit/:idmodalidadacademica" element={ <EditModalidadAcademica { ...props } /> }  />
                    <Route index path="/modalidadacademica/show/:idmodalidadacademica" element={ <ShowModalidadAcademica { ...props } /> }  />

                    <Route index path="/periodo/index" element={ <IndexPeriodo { ...props } /> }  />
                    <Route index path="/periodo/create" element={ <CreatePeriodo { ...props } /> }  />
                    <Route index path="/periodo/edit/:idperiodo" element={ <EditPeriodo { ...props } /> }  />
                    <Route index path="/periodo/show/:idperiodo" element={ <ShowPeriodo { ...props } /> }  />

                    <Route index path="/tipomateria/index" element={ <IndexTipoMateria { ...props } /> }  />
                    <Route index path="/tipomateria/create" element={ <CreateTipoMateria { ...props } /> }  />
                    <Route index path="/tipomateria/edit/:idtipomateria" element={ <EditTipoMateria { ...props } /> }  />
                    <Route index path="/tipomateria/show/:idtipomateria" element={ <ShowTipoMateria { ...props } /> }  />

                    <Route index path="/materia/index" element={ <IndexMateria { ...props } /> }  />
                    <Route index path="/materia/create" element={ <CreateMateria { ...props } /> }  />
                    <Route index path="/materia/edit/:idmateria" element={ <EditMateria { ...props } /> }  />
                    <Route index path="/materia/show/:idmateria" element={ <ShowMateria { ...props } /> }  />

                    <Route index path="/tipociudad/index" element={ <IndexTipoCiudad { ...props } /> }  />
                    <Route index path="/tipociudad/create" element={ <CreateTipoCiudad { ...props } /> }  />
                    <Route index path="/tipociudad/edit/:idtipociudad" element={ <EditTipoCiudad { ...props } /> }  />
                    <Route index path="/tipociudad/show/:idtipociudad" element={ <ShowTipoCiudad { ...props } /> }  />

                    <Route index path="/ciudad/index" element={ <IndexCiudad { ...props } /> }  />

                    <Route index path="/ofertaacademica/index" element={ <IndexOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/create" element={ <CreateOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/edit/:idofertaacademica" element={ <EditOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/show/:idofertaacademica" element={ <ShowOfertaAcademica { ...props } /> }  />

                    <Route index path="/unidadnegocio/index" element={ <IndexUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/create" element={ <CreateUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/edit/:idunidadnegocio" element={ <EditUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/show/:idunidadnegocio" element={ <ShowUnidadNegocio { ...props } /> }  />

                    <Route index path="/unidadadministrativa/index" element={ <IndexUnidadAdministrativa { ...props } /> }  />
                    <Route index path="/unidadadministrativa/create" element={ <CreateUnidadAdministrativa { ...props } /> }  />
                    <Route index path="/unidadadministrativa/edit/:idunidadadministrativa" element={ <EditUnidadAdministrativa { ...props } /> }  />
                    <Route index path="/unidadadministrativa/show/:idunidadadministrativa" element={ <ShowUnidadAdministrativa { ...props } /> }  />

                    <Route index path="/unidadacademica/index" element={ <IndexUnidadAcademica { ...props } /> }  />
                    <Route index path="/unidadacademica/create" element={ <CreateUnidadAcademica { ...props } /> }  />
                    <Route index path="/unidadacademica/edit/:idunidadacademica" element={ <EditUnidadAcademica { ...props } /> }  />
                    <Route index path="/unidadacademica/show/:idunidadacademica" element={ <ShowUnidadAcademica { ...props } /> }  />

                    <Route index path="/programa/index" element={ <IndexPrograma { ...props } /> }  />
                    <Route index path="/programa/create" element={ <CreatePrograma { ...props } /> }  />
                    <Route index path="/programa/edit/:idprograma" element={ <EditPrograma { ...props } /> }  />
                    <Route index path="/programa/show/:idprograma" element={ <ShowPrograma { ...props } /> }  />

                    <Route index path="/pensum/index" element={ <IndexPensum { ...props } /> }  />
                    <Route index path="/pensum/create" element={ <CreatePensum { ...props } /> }  />
                    <Route index path="/pensum/edit/:idpensum" element={ <EditPensum { ...props } /> }  />
                    <Route index path="/pensum/show/:idpensum" element={ <ShowPensum { ...props } /> }  />

                    <Route index path="/responsable/index" element={ <IndexResponsable { ...props } /> }  />
                    <Route index path="/responsable/create" element={ <CreateResponsable { ...props } /> }  />
                    <Route index path="/responsable/edit/:idresponsable" element={ <EditResponsable { ...props } /> }  />
                    <Route index path="/responsable/show/:idresponsable" element={ <ShowResponsable { ...props } /> }  />


                    <Route index path="/turno/index" element={ <IndexTurno { ...props } /> }  />
                    <Route index path="/turno/create" element={ <CreateTurno { ...props } /> }  />
                    <Route index path="/turno/edit/:idturno" element={ <EditTurno { ...props } /> }  />
                    <Route index path="/turno/show/:idturno" element={ <ShowTurno { ...props } /> }  />

                    <Route index path="/aula/index" element={ <IndexAula { ...props } /> }  />
                    <Route index path="/aula/create" element={ <CreateAula { ...props } /> }  />
                    <Route index path="/aula/edit/:idaula" element={ <EditAula { ...props } /> }  />
                    <Route index path="/aula/show/:idaula" element={ <ShowAula { ...props } /> }  />

                    <Route index path="/divisionacademica/index" element={ <IndexDivisionAcademica { ...props } /> }  />
                    <Route index path="/divisionacademica/create" element={ <CreateDivisionAcademica { ...props } /> }  />
                    <Route index path="/divisionacademica/edit/:iddivisionacademica" element={ <EditDivisionAcademica { ...props } /> }  />
                    <Route index path="/divisionacademica/show/:iddivisionacademica" element={ <ShowDivisionAcademica { ...props } /> }  />

                    <Route index path="/institucion/index" element={ <IndexInstitucion { ...props } /> }  />
                    <Route index path="/institucion/create" element={ <CreateInstitucion { ...props } /> }  />
                    <Route index path="/institucion/edit/:idinstitucion" element={ <EditInstitucion { ...props } /> }  />
                    <Route index path="/institucion/show/:idinstitucion" element={ <ShowInstitucion { ...props } /> }  />

                    <Route index path="/gestionperiodo/index" element={ <IndexGestionPeriodo { ...props } /> }  />
                    <Route index path="/gestionperiodo/create" element={ <CreateGestionPeriodo { ...props } /> }  />
                    <Route index path="/gestionperiodo/edit/:idgestionperiodo" element={ <EditGestionPeriodo { ...props } /> }  />
                    <Route index path="/gestionperiodo/show/:idgestionperiodo" element={ <ShowGestionPeriodo { ...props } /> }  />


                    <Route index path="/tipoidentificacion/index" element={ <IndexTipoIdentificacion { ...props } /> }  />
                    <Route index path="/tipoidentificacion/create" element={ <CreateTipoIdentificacion { ...props } /> }  />
                    <Route index path="/tipoidentificacion/edit/:idtipoidentificacion" element={ <EditTipoIdentificacion { ...props } /> }  />
                    <Route index path="/tipoidentificacion/show/:idtipoidentificacion" element={ <ShowTipoIdentificacion { ...props } /> }  />

                    <Route index path="/cargo/index" element={ <IndexCargo { ...props } /> }  />
                    <Route index path="/cargo/create" element={ <CreateCargo { ...props } /> }  />
                    <Route index path="/cargo/edit/:idcargo" element={ <EditCargo { ...props } /> }  />
                    <Route index path="/cargo/show/:idcargo" element={ <ShowCargo { ...props } /> }  />

                    <Route index path="/docente/index" element={ <IndexDocente { ...props } /> }  />
                    <Route index path="/docente/create" element={ <CreateDocente { ...props } /> }  />
                    <Route index path="/docente/edit/:iddocente" element={ <EditDocente { ...props } /> }  />
                    <Route index path="/docente/show/:iddocente" element={ <ShowDocente { ...props } /> }  />

                    <Route index path="/estudiante/index" element={ <IndexEstudiante { ...props } /> }  />
                    <Route index path="/estudiante/create" element={ <CreateEstudiante { ...props } /> }  />
                    <Route index path="/estudiante/edit/:idestudiante" element={ <EditEstudiante { ...props } /> }  />
                    <Route index path="/estudiante/show/:idestudiante" element={ <ShowEstudiante { ...props } /> }  />

                    <Route index path="/administrativo/index" element={ <IndexAdministrativo { ...props } /> }  />
                    <Route index path="/administrativo/create" element={ <CreateAdministrativo { ...props } /> }  />
                    <Route index path="/administrativo/edit/:idadministrativo" element={ <EditAdministrativo { ...props } /> }  />
                    <Route index path="/administrativo/show/:idadministrativo" element={ <ShowAdministrativo { ...props } /> }  />

                    <Route index path="/categoriadocumento/index" element={ <IndexCategoriaDocumento { ...props } /> }  />
                    <Route index path="/categoriadocumento/create" element={ <CreateCategoriaDocumento { ...props } /> }  />
                    <Route index path="/categoriadocumento/edit/:idcategoriadocumento" element={ <EditCategoriaDocumento { ...props } /> }  />
                    <Route index path="/categoriadocumento/show/:idcategoriadocumento" element={ <ShowCategoriaDocumento { ...props } /> }  />


                    <Route index path="/curso/index" element={ <IndexCurso { ...props } /> }  />
                    <Route index path="/curso/create" element={ <CreateCurso { ...props } /> }  />
                    <Route index path="/curso/edit/:idcurso" element={ <EditCurso { ...props } /> }  />
                    <Route index path="/curso/show/:idcurso" element={ <ShowCurso { ...props } /> }  />

                    <Route index path="/curso_horario/index" element={ <IndexCursoHorario { ...props } /> }  />

                    <Route index path="/motivoaperturacierrecurso/index" element={ <IndexMotivoAperturaCierreCurso { ...props } /> }  />
                    <Route index path="/motivoaperturacierrecurso/create" element={ <CreateMotivoAperturaCierreCurso { ...props } /> }  />
                    <Route index path="/motivoaperturacierrecurso/edit/:idmotivoaperturacierrecurso" element={ <EditMotivoAperturaCierreCurso { ...props } /> }  />
                    <Route index path="/motivoaperturacierrecurso/show/:idmotivoaperturacierrecurso" element={ <ShowMotivoAperturaCierreCurso { ...props } /> }  />

                    <Route index path="/aperturacierrecurso/index" element={ <IndexAperturaCierreCurso { ...props } /> }  />

                    <Route index path="/cierrecurso/index" element={ <IndexCierreCurso { ...props } /> }  />

                    <Route index path="/grupo/index" element={ <IndexGrupo { ...props } /> }  />
                    <Route index path="/grupo/create" element={ <CreateGrupo { ...props } /> }  />
                    <Route index path="/grupo/edit/:idgrupo" element={ <EditGrupo { ...props } /> }  />
                    <Route index path="/grupo/show/:idgrupo" element={ <ShowGrupo { ...props } /> }  />


                    <Route index path="/tipoactividad/index" element={ <IndexTipoActividad { ...props } /> }  />
                    <Route index path="/tipoactividad/create" element={ <CreateTipoActividad { ...props } /> }  />
                    <Route index path="/tipoactividad/edit/:idtipoactividad" element={ <EditTipoActividad { ...props } /> }  />
                    <Route index path="/tipoactividad/show/:idtipoactividad" element={ <ShowTipoActividad { ...props } /> }  />

                    <Route index path="/tipomediopublicitario/index" element={ <IndexTipoMedioPublicitario { ...props } /> }  />
                    <Route index path="/tipomediopublicitario/create" element={ <CreateTipoMedioPublicitario { ...props } /> }  />
                    <Route index path="/tipomediopublicitario/edit/:idtipomediopublicitario" element={ <EditTipoMedioPublicitario { ...props } /> }  />
                    <Route index path="/tipomediopublicitario/show/:idtipomediopublicitario" element={ <ShowTipoMedioPublicitario { ...props } /> }  />

                    <Route index path="/tipocontacto/index" element={ <IndexTipoContacto { ...props } /> }  />
                    <Route index path="/tipocontacto/create" element={ <CreateTipoContacto { ...props } /> }  />
                    <Route index path="/tipocontacto/edit/:idtipocontacto" element={ <EditTipoContacto { ...props } /> }  />
                    <Route index path="/tipocontacto/show/:idtipocontacto" element={ <ShowTipoContacto { ...props } /> }  />

                    <Route index path="/tiporesultado/index" element={ <IndexTipoResultado { ...props } /> }  />
                    <Route index path="/tiporesultado/create" element={ <CreateTipoResultado { ...props } /> }  />
                    <Route index path="/tiporesultado/edit/:idtiporesultado" element={ <EditTipoResultado { ...props } /> }  />
                    <Route index path="/tiporesultado/show/:idtiporesultado" element={ <ShowTipoResultado { ...props } /> }  />

                    <Route index path="/estadonegocio/index" element={ <IndexEstadoNegocio { ...props } /> }  />
                    <Route index path="/estadonegocio/create" element={ <CreateEstadoNegocio { ...props } /> }  />
                    <Route index path="/estadonegocio/edit/:idestadonegocio" element={ <EditEstadoNegocio { ...props } /> }  />
                    <Route index path="/estadonegocio/show/:idestadonegocio" element={ <ShowEstadoNegocio { ...props } /> }  />

                    <Route index path="/asesorresponsable/index" element={ <IndexAsesorResponsable { ...props } /> }  />
                    <Route index path="/asesorresponsable/create" element={ <CreateAsesorResponsable { ...props } /> }  />
                    <Route index path="/asesorresponsable/edit/:idasesorresponsable" element={ <EditAsesorResponsable { ...props } /> }  />
                    <Route index path="/asesorresponsable/show/:idasesorresponsable" element={ <ShowAsesorResponsable { ...props } /> }  />

                    <Route index path="/negocio/index" element={ <IndexNegocio { ...props } /> }  />
                    <Route index path="/negocio/create" element={ <CreateNegocio { ...props } /> }  />
                    <Route index path="/negocio/edit/:idnegocio" element={ <EditNegocio { ...props } /> }  />
                    <Route index path="/negocio/show/:idnegocio" element={ <ShowNegocio { ...props } /> }  />

                    <Route index path="/actividad/index" element={ <IndexActividad { ...props } /> }  />
                    <Route index path="/actividad/create" element={ <CreateActividad { ...props } /> }  />
                    <Route index path="/actividad/edit/:idactividad" element={ <EditActividad { ...props } /> }  />
                    <Route index path="/actividad/show/:idactividad" element={ <ShowActividad { ...props } /> }  />

                    <Route index path="/oportunidad/index" element={ <IndexOportunidad { ...props } /> }  />
                    <Route index path="/oportunidad/create" element={ <CreateOportunidad { ...props } /> }  />
                    <Route index path="/oportunidad/edit/:idoportunidad" element={ <EditOportunidad { ...props } /> }  />
                    <Route index path="/oportunidad/show/:idoportunidad" element={ <ShowOportunidad { ...props } /> }  />

                    <Route index path="/inscripcionprograma/index" element={ <CreateInscripcionPrograma { ...props } /> }  />
                    <Route index path="/inscripcioncurso/index" element={ <CreateInscripcionCurso { ...props } /> }  />
                    <Route index path="/inscripciongrupo/index" element={ <CreateInscripcionGrupo { ...props } /> }  />


                    <Route index path="/parametrocalificacion/index" element={ <IndexParametroCalificacion { ...props } /> }  />
                    <Route index path="/parametrocalificacion/create" element={ <CreateParametroCalificacion { ...props } /> }  />
                    <Route index path="/parametrocalificacion/edit/:idparametrocalificacion" element={ <EditParametroCalificacion { ...props } /> }  />
                    <Route index path="/parametrocalificacion/show/:idparametrocalificacion" element={ <ShowParametroCalificacion { ...props } /> }  />

                    <Route index path="/calendarioacademico/index" element={ <IndexCalendarioAcademico { ...props } /> }  />

                    <Route index path="/asistenciagrupo/index" element={ <IndexAsistenciaGrupo { ...props } /> }  />
                    <Route index path="/asistenciacurso/index" element={ <IndexAsistenciaCurso { ...props } /> }  />

                    <Route index path="/notacurso/index" element={ <IndexNotaCurso { ...props } /> }  />
                    <Route index path="/notagrupo/index" element={ <IndexNotaGrupo { ...props } /> }  />

                    <Route
                        path='*'
                        index
                        // element={<Navigate to="/inicio" replace />}
                        element={ <Error404 { ...props } /> }
                    />
                </Route>
            </Routes>
        </>
    );
};

export default HomeRoute;
