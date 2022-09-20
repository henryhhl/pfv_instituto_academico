
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

        case Constants.tipoRol_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
