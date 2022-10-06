
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import Periodo from "../models/periodo";

const inititalState = Periodo;

export const PeriodoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.periodo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.periodo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.periodo_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.periodo_onShow:
            state.idperiodo = action.payload.idperiodo;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.periodo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
