
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import GestionPeriodo from "../../models/estructurainstitucional/gestion_periodo";

const inititalState = GestionPeriodo;

export const GestionPeriodoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.gestionperiodo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.gestionperiodo_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.gestionperiodo_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.gestionperiodo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.gestionperiodo_onLimpiar:
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
    state.idgestionperiodo = turno.idgestionperiodo;
    state.descripcion = turno.descripcion;
    state.fechainicio = turno.fechainicio;
    state.fechafinal = turno.fechafinal;
    state.orden = turno.orden;
    state.concurrencia = turno.concurrencia;
    state.estado = turno.estado;
    state.isdelete = turno.isdelete;
}
