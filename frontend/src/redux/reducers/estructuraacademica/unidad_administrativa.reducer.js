
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import UnidadAdministrativa from "../../models/estructuraacademica/unidad_administrativa";

const inititalState = UnidadAdministrativa;

export const UnidadAdministrativaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.unidadadministrativa_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onShow:
            state.idunidadadministrativa = action.payload.idunidadadministrativa;
            state.fkidunidadnegocio = action.payload.fkidunidadnegocio;
            state.unidadnegocio = action.payload.unidadnegocio;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.unidadadministrativa_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
