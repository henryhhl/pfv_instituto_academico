
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import TipoMateria from "../models/tipoMateria";

const inititalState = TipoMateria;

export const TipoMateriaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoMateria_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoMateria_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoMateria_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
