

import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import InscripcionCurso from "../../models/inscripcion/inscripcioncurso";

const inititalState = InscripcionCurso;

export const InscripcionCursoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.inscripcioncurso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcioncurso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.inscripcioncurso_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcioncurso_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripcioncurso_onLimpiar:
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
    state.condicion = 'N';
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, inscripcionCurso ) => {
    state.idinscripcioncurso = inscripcionCurso.idinscripcioncurso;
    state.fechainscripcion = inscripcionCurso.fechainscripcion;
    state.numeroregistro = inscripcionCurso.numeroregistro;
    state.esinscripcionformalizada = inscripcionCurso.esinscripcionformalizada;
    state.condicion = inscripcionCurso.condicion;
    state.nota = inscripcionCurso.nota;
    state.concurrencia = inscripcionCurso.concurrencia;
    state.estado = inscripcionCurso.estado;
    state.isdelete = inscripcionCurso.isdelete;
}
