

import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import Materia from "../models/materia";

const inititalState = Materia;

export const MateriaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.materia_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.materia_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.materia_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
