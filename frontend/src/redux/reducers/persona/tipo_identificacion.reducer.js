
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoIdentificacion from "../../models/persona/tipo_identificacion";

const inititalState = TipoIdentificacion;

export const TipoIdentificacionReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoidentificacion_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoidentificacion_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoidentificacion_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoidentificacion_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoidentificacion_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, tipoIdentificacion ) => {
    state.idtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
    state.sigla = tipoIdentificacion.sigla;
    state.descripcion = tipoIdentificacion.descripcion;
    state.concurrencia = tipoIdentificacion.concurrencia;
    state.estado = tipoIdentificacion.estado;
    state.isdelete = tipoIdentificacion.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
