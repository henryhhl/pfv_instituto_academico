
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Bitacora from "../../models/seguridad/bitacora";

const inititalState = Bitacora;

export const BitacoraReducer = ( state = inititalState, action ) => {
    
    switch ( action.type ) {

        case Constants.bitacora_onShow:
            state.idbitacora = action.payload.idbitacora;
            state.accion = action.payload.accion;
            state.descripcion = action.payload.descripcion;
            state.tabla = action.payload.tabla;
            state.fkidtabla = action.payload.fkidtabla;
            state.uri = action.payload.uri;
            state.event = action.payload.event;
            state.ip = action.payload.ip;
            state.event = action.payload.event;
            state.estado = action.payload.estado;
            state.x_fecha = action.payload.x_fecha;
            state.x_hora = action.payload.x_hora;
            state.created_at = action.payload.created_at;
            state.usuario = action.payload.usuario;
            state = Object.assign( {}, state );
            return state;

        case Constants.bitacora_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
