
import Rol from "../models/rol";
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";

const inititalState = Rol;

export const RolReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.rol_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.rol_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.rol_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
