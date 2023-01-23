
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import CalendarioAcademico from "../../models/nota/calendarioacademico";

const inititalState = CalendarioAcademico;

export const CalendarioAcademicoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.calendarioacademico_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.calendarioacademico_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.calendarioacademico_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.calendarioacademico_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.calendarioacademico_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, calendarioAcademico ) => {
    state.idcalendarioacademico = calendarioAcademico.idcalendarioacademico;
    
    state.concurrencia = calendarioAcademico.concurrencia;
    state.estado = calendarioAcademico.estado;
    state.isdelete = calendarioAcademico.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.existeclases = 'No';
    state.tipoferiado = 'Ninguno';
    state.tipoactividad = 'Ninguno';
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
