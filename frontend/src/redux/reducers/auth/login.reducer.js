
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Login from "../../models/auth/login";

const inititalState = Login;

export const LoginReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.login_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.login_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
