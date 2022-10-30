
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import UnidadNegocio from "../../models/parametros/unidad_negocio";

const inititalState = UnidadNegocio;

export const UnidadNegocioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.unidadNegocio_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadNegocio_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.unidadNegocio_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadNegocio_onShow:
            state.idunidadnegocio = action.payload.idunidadnegocio;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadNegocio_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
