
import { Route } from 'react-router-dom';

import IndexTipoRol from '../../screens/modules/seguridad/tiporol/tipo_rol.index';
import CreateTipoRol from '../../screens/modules/seguridad/tiporol/tipo_rol.create';
import EditTipoRol from '../../screens/modules/seguridad/tiporol/tipo_rol.edit';
import ShowTipoRol from '../../screens/modules/seguridad/tiporol/tipo_rol.show';

import IndexTipoPermiso from '../../screens/modules/seguridad/tipopermiso/tipo_permiso.index';
import CreateTipoPermiso from '../../screens/modules/seguridad/tipopermiso/tipo_permiso.create';
import EditTipoPermiso from '../../screens/modules/seguridad/tipopermiso/tipo_permiso.edit';
import ShowTipoPermiso from '../../screens/modules/seguridad/tipopermiso/tipo_permiso.show';

import IndexRol from '../../screens/modules/seguridad/rol/rol.index';
import CreateRol from '../../screens/modules/seguridad/rol/rol.create';
import EditRol from '../../screens/modules/seguridad/rol/rol.edit';
import ShowRol from '../../screens/modules/seguridad/rol/rol.show';

import IndexPermiso from '../../screens/modules/seguridad/permiso/permiso.index';
import AsignarRol from '../../screens/modules/seguridad/asignar_rol';
import AsignarPermiso from '../../screens/modules/seguridad/asignar_permiso';

import IndexUsuario from '../../screens/modules/seguridad/usuario/usuario.index';
import CreateUsuario from '../../screens/modules/seguridad/usuario/usuario.create';
import EditUsuario from '../../screens/modules/seguridad/usuario/usuario.edit';
import ShowUsuario from '../../screens/modules/seguridad/usuario/usuario.show';

const SeguridadRoute = ( props ) => {
  return (
    <>
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
    </>
  );
};

export default SeguridadRoute;
