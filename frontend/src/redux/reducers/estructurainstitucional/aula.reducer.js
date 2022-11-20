
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Aula from "../../models/estructurainstitucional/aula";

const inititalState = Aula;

export const AulaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.aula_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.aula_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.aula_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.aula_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.aula_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, aula ) => {
    state.idaula = aula.idaula;
    state.sigla = aula.sigla;
    state.descripcion = aula.descripcion;
    state.concurrencia = aula.concurrencia;
    state.estado = aula.estado;
    state.isdelete = aula.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
