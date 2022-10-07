
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import NivelAcademico from "../models/nivelAcademico";

const inititalState = NivelAcademico;

export const NivelAcademicoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.nivelAcademico_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.nivelAcademico_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.nivelAcademico_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.nivelAcademico_onShow:
            state.idnivelacademico = action.payload.idnivelacademico;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.nivelAcademico_onLimpiar:
            Functions.cleanObejct(state) 
            state = Object.assign( {}, state);
            return state;
    
        default:
            return state;
    }
};
