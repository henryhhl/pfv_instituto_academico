
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoResultado from "../../models/oportunidad/tiporesultado";

const inititalState = TipoResultado;

export const TipoResultadoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tiporesultado_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tiporesultado_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tiporesultado_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.tiporesultado_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tiporesultado_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, tipoResultado ) => {
    state.idtiporesultado = tipoResultado.idtiporesultado;
    state.sigla = tipoResultado.sigla;
    state.descripcion = tipoResultado.descripcion;
    state.concurrencia = tipoResultado.concurrencia;
    state.estado = tipoResultado.estado;
    state.isdelete = tipoResultado.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
