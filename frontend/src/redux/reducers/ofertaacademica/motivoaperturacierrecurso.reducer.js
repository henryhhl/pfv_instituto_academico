
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import MotivoAperturaCierreCurso from "../../models/ofertaacademica/motivoaperturacierrecurso";

const inititalState = MotivoAperturaCierreCurso;

export const MotivoAperturaCierreCursoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.motivoaperturacierrecurso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.motivoaperturacierrecurso_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.motivoaperturacierrecurso_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.motivoaperturacierrecurso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.motivoaperturacierrecurso_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, motivoAperturaCierreCurso ) => {
    state.idmotivoaperturacierrecurso = motivoAperturaCierreCurso.idmotivoaperturacierrecurso;
    state.sigla = motivoAperturaCierreCurso.sigla;
    state.descripcion = motivoAperturaCierreCurso.descripcion;
    state.concurrencia = motivoAperturaCierreCurso.concurrencia;
    state.estado = motivoAperturaCierreCurso.estado;
    state.isdelete = motivoAperturaCierreCurso.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
