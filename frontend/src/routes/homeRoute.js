

import { Routes, Route, Navigate } from 'react-router-dom';
import InicioPage from '../screens/inicioPage';
import AppMain from '../layouts/app';

import Error404 from '../errors/errors404';

import IndexTipoRol from '../screens/modules/seguridad/tiporol/indexTipoRol';
import CreateTipoRol from '../screens/modules/seguridad/tiporol/createTipoRol';
import EditTipoRol from '../screens/modules/seguridad/tiporol/editTipoRol';
import ShowTipoRol from '../screens/modules/seguridad/tiporol/showTipoRol';

import IndexTipoPermiso from '../screens/modules/seguridad/tipopermiso/indexTipoPermiso';
import CreateTipoPermiso from '../screens/modules/seguridad/tipopermiso/createTipoPermiso';
import EditTipoPermiso from '../screens/modules/seguridad/tipopermiso/editTipoPermiso';
import ShowTipoPermiso from '../screens/modules/seguridad/tipopermiso/showTipoPermiso';

import IndexRol from '../screens/modules/seguridad/rol/indexRol';
import CreateRol from '../screens/modules/seguridad/rol/createRol';
import EditRol from '../screens/modules/seguridad/rol/editRol';
import ShowRol from '../screens/modules/seguridad/rol/showRol';

import IndexPermiso from '../screens/modules/seguridad/permiso/indexPermiso';
import AsignarRol from '../screens/modules/seguridad/asignar_rol';
import AsignarPermiso from '../screens/modules/seguridad/asignar_permiso';

import IndexUsuario from '../screens/modules/seguridad/usuario/indexUsuario';
import CreateUsuario from '../screens/modules/seguridad/usuario/createUsuario';
import EditUsuario from '../screens/modules/seguridad/usuario/editUsuario';
import ShowUsuario from '../screens/modules/seguridad/usuario/showUsuario';

import IndexNivelAcademico from '../screens/modules/admin/nivelacademico/indexNivelAcademico';
import CreateNivelAcademico from '../screens/modules/admin/nivelacademico/createNivelAcademico';
import EditNivelAcademico from '../screens/modules/admin/nivelacademico/editNivelAcademico';
import ShowNivelAcademico from '../screens/modules/admin/nivelacademico/showNivelAcademico';

import IndexModalidadAcademica from '../screens/modules/admin/modalidad/indexModalidadAcademica';
import CreateModalidadAcademica from '../screens/modules/admin/modalidad/createModalidadAcademica';
import EditModalidadAcademica from '../screens/modules/admin/modalidad/editModalidadAcademica';
import ShowModalidadAcademica from '../screens/modules/admin/modalidad/showModalidadAcademica';

import IndexPeriodo from '../screens/modules/admin/periodo/indexPeriodo';
import CreatePeriodo from '../screens/modules/admin/periodo/createPeriodo';
import EditPeriodo from '../screens/modules/admin/periodo/editPeriodo';
import ShowPeriodo from '../screens/modules/admin/periodo/showPeriodo';

import IndexTipoMateria from '../screens/modules/admin/tipomateria/indexTipoMateria';
import CreateTipoMateria from '../screens/modules/admin/tipomateria/createTipoMateria';
import EditTipoMateria from '../screens/modules/admin/tipomateria/editTipoMateria';
import ShowTipoMateria from '../screens/modules/admin/tipomateria/showTipoMateria';

import IndexMateria from '../screens/modules/admin/materia/indexMateria';
import CreateMateria from '../screens/modules/admin/materia/createMateria';
import EditMateria from '../screens/modules/admin/materia/editMateria';
import ShowMateria from '../screens/modules/admin/materia/showMateria';

import IndexReferenciaContacto from '../screens/modules/admin/referenciacontacto/referencia_contacto.index';
import CreateReferenciaContacto from '../screens/modules/admin/referenciacontacto/referencia_contacto.create';
import EditReferenciaContacto from '../screens/modules/admin/referenciacontacto/referencia_contacto.edit';
import ShowReferenciaContacto from '../screens/modules/admin/referenciacontacto/referencia_contacto.show';

import IndexTipoCiudad from '../screens/modules/admin/tipociudad/tipo_ciudad.index';
import CreateTipoCiudad from '../screens/modules/admin/tipociudad/tipo_ciudad.create';
import EditTipoCiudad from '../screens/modules/admin/tipociudad/tipo_ciudad.edit';
import ShowTipoCiudad from '../screens/modules/admin/tipociudad/tipo_ciudad.show';

import IndexCiudad from '../screens/modules/admin/ciudad/indexCiudad';

import IndexOfertaAcademica from '../screens/modules/admin/ofertaacademica/indexOfertaAcademica';
import CreateOfertaAcademica from '../screens/modules/admin/ofertaacademica/createOfertaAcademica';
import EditOfertaAcademica from '../screens/modules/admin/ofertaacademica/editOfertaAcademica';
import ShowOfertaAcademica from '../screens/modules/admin/ofertaacademica/showOfertaAcademica';

import IndexUnidadNegocio from '../screens/modules/admin/unidadnegocio/indexUnidadNegocio';
import CreateUnidadNegocio from '../screens/modules/admin/unidadnegocio/createUnidadNegocio';
import EditUnidadNegocio from '../screens/modules/admin/unidadnegocio/editUnidadNegocio';
import ShowUnidadNegocio from '../screens/modules/admin/unidadnegocio/showUnidadNegocio';

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

const HomeRoute = (props) => {
    return (
        <>
            <Routes>
                <Route path="/notFound" element={ <InicioPage { ...props } /> }  />
                <Route path="/" element={<AppMain />}>
                    <Route index path="/inicio" element={ <InicioPage { ...props } /> }  />

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
                    <Route index path="/asignar_rol" element={ <AsignarRol { ...props } /> }  />
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

                    <Route index path="/referenciacontacto/index" element={ <IndexReferenciaContacto { ...props } /> }  />
                    <Route index path="/referenciacontacto/create" element={ <CreateReferenciaContacto { ...props } /> }  />
                    <Route index path="/referenciacontacto/edit/:idreferenciacontacto" element={ <EditReferenciaContacto { ...props } /> }  />
                    <Route index path="/referenciacontacto/show/:idreferenciacontacto" element={ <ShowReferenciaContacto { ...props } /> }  />

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
