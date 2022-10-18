
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Programa from "../../models/estructuraacademica/programa";

const inititalState = Programa;

export const ProgramaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.programa_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onShow:
            state.idprograma = action.payload.idprograma;

            state.fkidunidadnegocio = action.payload.fkidunidadnegocio;
            state.unidadnegocio = action.payload.unidadnegocio;

            state.fkidunidadadministrativa = action.payload.fkidunidadadministrativa;
            state.unidadadministrativa = action.payload.unidadadministrativa;

            state.fkidunidadacademica = action.payload.fkidunidadacademica;
            state.unidadacademica = action.payload.unidadacademica;

            state.fkidnivelacademico = action.payload.fkidnivelacademico;
            state.nivelacademico = action.payload.nivelacademico;

            state.fkidmodalidadacademica = action.payload.fkidmodalidadacademica;
            state.modalidadacademica = action.payload.modalidadacademica;

            state.codigo = action.payload.codigo;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;

            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.programa_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
