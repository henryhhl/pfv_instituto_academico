

import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Materia from "../../models/parametros/materia";

const inititalState = Materia;

export const MateriaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.materia_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.materia_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.materia_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state.creditos = 0;
            state = Object.assign( {}, state );
            return state;

        case Constants.materia_onShow:
            state.idmateria = action.payload.idmateria;
            state.codigo = action.payload.codigo;
            state.sigla = action.payload.sigla;
            state.nombrelargo = action.payload.nombrelargo;
            state.nombrecorto = action.payload.nombrecorto;
            state.nombrealternativo = action.payload.nombrealternativo;
            state.creditos = action.payload.creditos;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.materia_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
