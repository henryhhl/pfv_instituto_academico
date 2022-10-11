
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Usuario from "../../models/seguridad/usuario";

const inititalState = Usuario;

export const UsuarioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.usuario_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.usuario_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.usuario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.usuario_onShow:
            state.idusuario = action.payload.idusuario;
            state.email = action.payload.email;
            state.login = action.payload.login;
            state.password = action.payload.password;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.usuario_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
