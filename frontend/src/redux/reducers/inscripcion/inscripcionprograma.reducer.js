

import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import InscripcionPrograma from "../../models/inscripcion/inscripcionprograma";

const inititalState = InscripcionPrograma;

export const InscripcionProgramaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.inscripcionprograma_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcionprograma_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.inscripcionprograma_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcionprograma_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcionprograma_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    state.fechainscripcion = Functions.dateCurrentToString();
    state.esinscripcionformalizada = 'S';
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, tipoResultado ) => {
    state.idinscripcionprograma = tipoResultado.idinscripcionprograma;
    state.fechainscripcion = tipoResultado.fechainscripcion;
    state.numeroregistro = tipoResultado.numeroregistro;
    state.esinscripcionformalizada = tipoResultado.esinscripcionformalizada;
    state.nota = tipoResultado.nota;
    state.concurrencia = tipoResultado.concurrencia;
    state.estado = tipoResultado.estado;
    state.isdelete = tipoResultado.isdelete;
}
