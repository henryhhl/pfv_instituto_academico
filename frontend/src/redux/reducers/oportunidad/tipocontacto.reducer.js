
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoContacto from "../../models/oportunidad/tipocontacto";

const inititalState = TipoContacto;

export const TipoContactoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipocontacto_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipocontacto_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipocontacto_onCreate:
            Functions.cleanObejct(state);
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.tipocontacto_onShow:
            Functions.cleanObejct(state);
            state.idtipocontacto = action.payload.idtipocontacto;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.tipocontacto_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
