
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import OfertaAcademica from "../models/ofertaAcademica";

const inititalState = OfertaAcademica;

export const OfertaAcademicaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.ofertaAcademica_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.ofertaAcademica_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.ofertaAcademica_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.ofertaAcademica_onShow:
            state.idofertaacademica = action.payload.idofertaacademica;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.ofertaAcademica_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
