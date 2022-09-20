
import { combineReducers } from 'redux';

import { TipoRolReducer } from '../reducers/tipoRolReducers';
import { RolReducer } from '../reducers/rolReducers';

const RootReducer = combineReducers( {
    TipoRol: TipoRolReducer,
    Rol: RolReducer,
} );

export default RootReducer;