
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import UnidadNegocio from "../models/unidadNegocio";

const inititalState = UnidadNegocio;

export const UnidadNegocioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.unidadNegocio_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadNegocio_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.unidadNegocio_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
