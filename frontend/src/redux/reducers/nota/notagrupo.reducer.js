
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import NotaGrupo from "../../models/nota/notagrupo";

const inititalState = NotaGrupo;

export const NotaGrupoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.notagrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.notagrupo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
