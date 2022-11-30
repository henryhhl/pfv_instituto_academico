
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoActividad from "../../models/oportunidad/tipoactividad";

const inititalState = TipoActividad;

export const TipoActividadReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoactividad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoactividad_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoactividad_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoactividad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoactividad_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, tipoActividad ) => {
    state.idtipoactividad = tipoActividad.idtipoactividad;
    state.sigla = tipoActividad.sigla;
    state.descripcion = tipoActividad.descripcion;
    state.concurrencia = tipoActividad.concurrencia;
    state.estado = tipoActividad.estado;
    state.isdelete = tipoActividad.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
