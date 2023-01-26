
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import AsignarRol from "../../models/seguridad/asignarrol";

const inititalState = AsignarRol;

export const AsignarRolReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.asignarrol_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.asignarrol_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
