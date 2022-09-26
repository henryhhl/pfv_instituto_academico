
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import NivelAcademico from "../models/nivelAcademico";

const inititalState = NivelAcademico;

export const NivelAcademicoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.nivelAcademico_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.nivelAcademico_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.nivelAcademico_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
