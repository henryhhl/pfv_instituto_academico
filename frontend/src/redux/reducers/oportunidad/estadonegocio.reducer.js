
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import EstadoNegocio from "../../models/oportunidad/estadonegocio";

const inititalState = EstadoNegocio;

export const EstadoNegocioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.estadonegocio_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.estadonegocio_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.estadonegocio_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.estadonegocio_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.estadonegocio_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, estadoNegocio ) => {
    state.idestadonegocio = estadoNegocio.idestadonegocio;
    state.sigla = estadoNegocio.sigla;
    state.descripcion = estadoNegocio.descripcion;
    state.valorporcentaje = estadoNegocio.valorporcentaje;
    state.concurrencia = estadoNegocio.concurrencia;
    state.estado = estadoNegocio.estado;
    state.isdelete = estadoNegocio.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
