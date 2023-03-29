
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import NotaCurso from "../../models/nota/notacurso";

const inititalState = NotaCurso;

export const NotaCursoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.notacurso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.notacurso_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
