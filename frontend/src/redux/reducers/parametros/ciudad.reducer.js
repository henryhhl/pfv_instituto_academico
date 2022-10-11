
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Ciudad from "../../models/parametros/ciudad";

const inititalState = Ciudad;

export const CiudadReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.ciudad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.ciudad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.ciudad_onCreate:
            state.fkidciudadpadre = action.payload;
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.ciudad_onShow:
            state.idciudad = action.payload.idciudad;
            state.fkidciudadpadre = action.payload.fkidciudadpadre;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.ciudad_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
