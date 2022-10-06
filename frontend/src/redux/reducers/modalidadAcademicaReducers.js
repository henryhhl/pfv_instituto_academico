
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import ModalidadAcademica from "../models/modalidadacademica";

const inititalState = ModalidadAcademica;

export const ModalidadAcademicaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.modalidad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.modalidad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.modalidad_onCreate:
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.modalidad_onShow:
            state.idmodalidadacademica = action.payload.idmodalidadacademica;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.modalidad_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
