
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import AsistenciaGrupo from "../../models/nota/asistenciagrupo";

const inititalState = AsistenciaGrupo;

export const AsistenciaGrupoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.asistenciagrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.asistenciagrupo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
