

import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import InscripcionGrupo from "../../models/inscripcion/inscripciongrupo";

const inititalState = InscripcionGrupo;

export const InscripcionGrupoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.inscripciongrupo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripciongrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.inscripciongrupo_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripciongrupo_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.inscripciongrupo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    state.fechainscripcion = Functions.dateCurrentToString();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, inscripcionGrupo ) => {
    state.idinscripciongrupo = inscripcionGrupo.idinscripciongrupo;
    state.fechainscripcion = inscripcionGrupo.fechainscripcion;
    state.nota = inscripcionGrupo.nota;
    state.concurrencia = inscripcionGrupo.concurrencia;
    state.estado = inscripcionGrupo.estado;
    state.isdelete = inscripcionGrupo.isdelete;
}
