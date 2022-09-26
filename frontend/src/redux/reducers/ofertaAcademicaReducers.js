
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

        case Constants.ofertaAcademica_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
