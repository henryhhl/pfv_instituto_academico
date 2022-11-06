
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import CategoriaDocumento from "../../models/persona/categoria_documento";

const inititalState = CategoriaDocumento;

export const CategoriaDocumentoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.categoriadocumento_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.categoriadocumento_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.categoriadocumento_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.categoriadocumento_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.categoriadocumento_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, tipoIdentificacion ) => {
    state.idcategoriadocumento = tipoIdentificacion.idcategoriadocumento;
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
