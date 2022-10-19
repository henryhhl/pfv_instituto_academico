
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoCiudad from "../../models/parametros/tipo_ciudad";

const inititalState = TipoCiudad;

export const TipoCiudadReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipociudad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipociudad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipociudad_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.tipociudad_onShow:
            state.idtipociudad = action.payload.idtipociudad;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.tipociudad_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
