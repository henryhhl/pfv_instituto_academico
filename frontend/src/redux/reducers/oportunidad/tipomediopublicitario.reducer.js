
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoMedioPublicitario from "../../models/oportunidad/tipomediopublicitario";

const inititalState = TipoMedioPublicitario;

export const TipoMedioPublicitarioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipomediopublicitario_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipomediopublicitario_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipomediopublicitario_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.tipomediopublicitario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipomediopublicitario_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, tipoMedioPublicitario ) => {
    state.idtipomediopublicitario = tipoMedioPublicitario.idtipomediopublicitario;
    state.sigla = tipoMedioPublicitario.sigla;
    state.descripcion = tipoMedioPublicitario.descripcion;
    state.concurrencia = tipoMedioPublicitario.concurrencia;
    state.estado = tipoMedioPublicitario.estado;
    state.isdelete = tipoMedioPublicitario.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
