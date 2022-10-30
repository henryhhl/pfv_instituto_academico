
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import TipoMateria from "../../models/parametros/tipo_materia";

const inititalState = TipoMateria;

export const TipoMateriaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.tipoMateria_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoMateria_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.tipoMateria_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoMateria_onShow:
            state.idtipomateria = action.payload.idtipomateria;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.tipoMateria_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
