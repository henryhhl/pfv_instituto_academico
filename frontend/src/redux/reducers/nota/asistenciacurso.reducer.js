
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import AsistenciaCurso from "../../models/nota/asistenciacurso";

const inititalState = AsistenciaCurso;

export const AsistenciaCursoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.asistenciacurso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.asistenciacurso_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
