
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ReferenciaContacto from "../../models/parametros/referencia_contacto";

const inititalState = ReferenciaContacto;

export const ReferenciaContactoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.referenciaContacto_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.referenciaContacto_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.referenciaContacto_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.referenciaContacto_onShow:
            state.idreferenciacontacto = action.payload.idreferenciacontacto;
            state.descripcion = action.payload.descripcion;
            state.tiporeferenciacontacto = action.payload.tiporeferenciacontacto;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.referenciaContacto_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
