
import Rol from "../models/rol";
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";

const inititalState = Rol;

export const RolReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.rol_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.rol_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.rol_onShow:
            state.idrol = action.payload.idrol;
            state.fkidtiporol = action.payload.fkidtiporol;
            state.tiporol = action.payload.tiporol;
            state.descripcion = action.payload.descripcion;
            state.nota = action.payload.nota;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.rol_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.rol_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
