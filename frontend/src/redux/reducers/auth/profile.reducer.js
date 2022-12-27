
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Profile from "../../models/auth/profile";

const inititalState = Profile;

export const ProfileReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.profile_onCreate:
            Functions.cleanObejct(state);
            // onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.profile_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.profile_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.profile_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, auth ) => {
    const dateNow = new Date();
    const hora = dateNow.getHours();

    if ( hora >= 0 && hora < 12 ) {
        state.showSaludo = "Buenos Días";
    }

    if ( hora >= 12 && hora < 18 ) {
        state.showSaludo = "Buenos Tardes";
    }

    if ( hora >= 18 && hora < 24 ) {
        state.showSaludo = "Buenos Noches";
    }

    state.idusuario = auth.idusuario;
    state.login = auth.login;
    state.estado = auth.estado;

    state.idprofile = auth.profile !== null ? auth.profile.idprofile : null;
    state.fkidciudadorigen = auth.profile !== null ? auth.profile.fkidciudadorigen : null;
    state.ciudadorigen = auth.profile !== null ? auth.profile.ciudadorigen : null;
    state.direccion = auth.profile !== null ? auth.profile.direccion : null;
    state.nombreprincipal = auth.nombreprincipal;
    state.nombreadicional = auth.profile !== null ? auth.profile.nombreadicional : null;
    state.apellidoprimero = auth.profile !== null ? auth.profile.apellidoprimero : null;
    state.apellidosegundo = auth.profile !== null ? auth.profile.apellidosegundo : null;
    state.email = auth.email;
    state.genero = auth.profile !== null ? auth.profile.genero : null;
    state.fechanacimiento = auth.profile !== null ? auth.profile.fechanacimiento : null;
    state.telefonomobile = auth.profile !== null ? auth.profile.telefonomobile : null;
    state.imagen = auth.profile !== null ? auth.profile.imagen : null;
}
