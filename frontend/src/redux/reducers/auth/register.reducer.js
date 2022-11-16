
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Register from "../../models/auth/register";

const inititalState = Register;

export const RegisterReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.register_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.register_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
