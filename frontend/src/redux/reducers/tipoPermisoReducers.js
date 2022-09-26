
import TipoPermiso from "../models/tipoPermiso";
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";

const inititalState = TipoPermiso;

export const TipoPermisoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoPermiso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoPermiso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoPermiso_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
