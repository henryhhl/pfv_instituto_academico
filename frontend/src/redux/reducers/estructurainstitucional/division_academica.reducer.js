
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import DivisionAcademica from "../../models/estructurainstitucional/division_academica";

const inititalState = DivisionAcademica;

export const DivisionAcademicaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.divisionacademica_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.divisionacademica_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.divisionacademica_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.divisionacademica_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.divisionacademica_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    state.orden = 1;
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}

const onSetData = ( state = inititalState, turno ) => {
    state.iddivisionacademica = turno.iddivisionacademica;
    state.sigla = turno.sigla;
    state.descripcion = turno.descripcion;
    state.orden = turno.orden;
    state.concurrencia = turno.concurrencia;
    state.estado = turno.estado;
    state.isdelete = turno.isdelete;
}
