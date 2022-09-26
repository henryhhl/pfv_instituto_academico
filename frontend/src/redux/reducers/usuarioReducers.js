
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import Usuario from "../models/usuario";

const inititalState = Usuario;

export const UsuarioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.usuario_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.usuario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.usuario_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
