

import { Routes, Route, Navigate } from 'react-router-dom';
import InicioPage from '../screens/inicioPage';
import AppMain from '../layouts/app';
import IndexTipoRol from '../screens/modules/seguridad/tiporol/indexTipoRol';
import CreateTipoRol from '../screens/modules/seguridad/tiporol/createTipoRol';

const HomeRoute = (props) => {
    return (
        <>
            <Routes>
                <Route path="/notFound" element={ <InicioPage { ...props } /> }  />
                <Route path="/" element={<AppMain />}>
                    <Route index path="/inicio" element={ <InicioPage { ...props } /> }  />

                    <Route index path="/tipo_rol/index" element={ <IndexTipoRol { ...props } /> }  />
                    <Route index path="/tipo_rol/create" element={ <CreateTipoRol { ...props } /> }  />

                    <Route
                        index
                        element={<Navigate to="/inicio" replace />}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default HomeRoute;
