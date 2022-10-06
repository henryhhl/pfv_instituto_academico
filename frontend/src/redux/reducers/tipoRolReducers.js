
import TipoRol from "../models/tipoRol";
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";

const inititalState = TipoRol;

export const TipoRolReducer = ( state = inititalState, action ) => {
    
    switch ( action.type ) {
        case Constants.tipoRol_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoRol_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoRol_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoRol_onShow:
            state.idtiporol = action.payload.idtiporol;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoRol_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
