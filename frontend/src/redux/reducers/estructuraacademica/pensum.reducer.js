
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Pensum from "../../models/estructuraacademica/pensum";

const inititalState = Pensum;

export const PensumReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.pensum_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onCreate:
            state.estadoproceso = 'Vigente';
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onShow:
            state.idpensum = action.payload.idpensum;

            state.fkidunidadnegocio = action.payload.fkidunidadnegocio;
            state.unidadnegocio = action.payload.unidadnegocio;

            state.fkidunidadadministrativa = action.payload.fkidunidadadministrativa;
            state.unidadadministrativa = action.payload.unidadadministrativa;

            state.fkidunidadacademica = action.payload.fkidunidadacademica;
            state.unidadacademica = action.payload.unidadacademica;

            state.fkidprograma = action.payload.fkidprograma;
            state.programa = action.payload.programa;

            state.descripcion = action.payload.descripcion;
            state.fechaaprobacion = action.payload.fechaaprobacion;
            state.estadoproceso = action.payload.estadoproceso;

            state.estado = action.payload.estado;
            state.concurrencia = action.payload.concurrencia;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.pensum_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
