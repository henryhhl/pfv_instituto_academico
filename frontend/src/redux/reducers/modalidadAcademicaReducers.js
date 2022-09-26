
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import ModalidadAcademica from "../models/modalidadacademica";

const inititalState = ModalidadAcademica;

export const ModalidadAcademicaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.modalidad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.modalidad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.modalidad_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
