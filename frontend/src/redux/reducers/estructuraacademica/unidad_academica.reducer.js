
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import UnidadAcademica from "../../models/estructuraacademica/unidad_academica";

const inititalState = UnidadAcademica;

export const UnidadAcademicaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.unidadacademica_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadacademica_onCreate:
            Functions.cleanObejct(state);
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadacademica_onShow:
            Functions.cleanObejct(state);
            state.idunidadacademica = action.payload.idunidadacademica;
            state.fkidunidadnegocio = action.payload.fkidunidadnegocio;
            state.unidadnegocio = action.payload.unidadnegocio;
            state.fkidunidadadministrativa = action.payload.fkidunidadadministrativa;
            state.unidadadministrativa = action.payload.unidadadministrativa;
            state.codigo = action.payload.codigo;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadacademica_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.unidadacademica_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
