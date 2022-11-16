
import Constants from "../constants/constans";

const inititalState = {
    isSesion: false,
};

export const SesionReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.setShowSesion:
            state = Object.assign( {}, { ...state, isSesion: true, } );
            return state;

        case Constants.setHiddenSesion:
            state = Object.assign( {}, { ...state, isSesion: false, } );
            return state;
    
        default:
            return state;
    }
};
