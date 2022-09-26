

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

import IndexCiudad from '../screens/modules/admin/ciudad/indexCiudad';

import IndexOfertaAcademica from '../screens/modules/admin/ofertaacademica/indexOfertaAcademica';
import CreateOfertaAcademica from '../screens/modules/admin/ofertaacademica/createOfertaAcademica';
import EditOfertaAcademica from '../screens/modules/admin/ofertaacademica/editOfertaAcademica';
import ShowOfertaAcademica from '../screens/modules/admin/ofertaacademica/showOfertaAcademica';

import IndexUnidadNegocio from '../screens/modules/admin/unidadnegocio/indexUnidadNegocio';
import CreateUnidadNegocio from '../screens/modules/admin/unidadnegocio/createUnidadNegocio';
import EditUnidadNegocio from '../screens/modules/admin/unidadnegocio/editUnidadNegocio';
import ShowUnidadNegocio from '../screens/modules/admin/unidadnegocio/showUnidadNegocio';

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

                    <Route index path="/ciudad/index" element={ <IndexCiudad { ...props } /> }  />

                    <Route index path="/ofertaacademica/index" element={ <IndexOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/create" element={ <CreateOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/edit/:idofertaacademica" element={ <EditOfertaAcademica { ...props } /> }  />
                    <Route index path="/ofertaacademica/show/:idofertaacademica" element={ <ShowOfertaAcademica { ...props } /> }  />

                    <Route index path="/unidadnegocio/index" element={ <IndexUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/create" element={ <CreateUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/edit/:idunidadnegocio" element={ <EditUnidadNegocio { ...props } /> }  />
                    <Route index path="/unidadnegocio/show/:idunidadnegocio" element={ <ShowUnidadNegocio { ...props } /> }  />

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
