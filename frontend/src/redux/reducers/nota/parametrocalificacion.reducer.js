
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ParametroCalificacion from "../../models/nota/parametrocalificacion";

const inititalState = ParametroCalificacion;

export const ParametroCalificacionReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.parametrocalificacion_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.parametrocalificacion_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.parametrocalificacion_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.parametrocalificacion_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.parametrocalificacion_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, parametroCalificacion ) => {
    state.idparametrocalificacion = parametroCalificacion.idparametrocalificacion;
    state.sigla = parametroCalificacion.sigla;
    state.descripcion = parametroCalificacion.descripcion;
    state.valorporcentaje = parametroCalificacion.valorporcentaje;
    state.concurrencia = parametroCalificacion.concurrencia;
    state.estado = parametroCalificacion.estado;
    state.isdelete = parametroCalificacion.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.valorporcentaje = 0;
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
