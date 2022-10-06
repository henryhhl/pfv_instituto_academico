
import TipoPermiso from "../models/tipoPermiso";
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";

const inititalState = TipoPermiso;

export const TipoPermisoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoPermiso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoPermiso_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoPermiso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoPermiso_onShow:
            state.idtipopermiso = action.payload.idtipopermiso;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoPermiso_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
