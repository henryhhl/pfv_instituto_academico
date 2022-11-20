
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Turno from "../../models/estructurainstitucional/turno";

const inititalState = Turno;

export const TurnoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.turno_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.turno_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.turno_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.turno_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.turno_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, turno ) => {
    state.idturno = turno.idturno;
    state.sigla = turno.sigla;
    state.descripcion = turno.descripcion;
    state.concurrencia = turno.concurrencia;
    state.estado = turno.estado;
    state.isdelete = turno.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
