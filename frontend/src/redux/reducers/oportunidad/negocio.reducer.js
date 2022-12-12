
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Negocio from "../../models/oportunidad/negocio";

const inititalState = Negocio;

export const NegocioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.negocio_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.negocio_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.negocio_onCreateNegocio:
            Functions.cleanObejct(state);
            state.fkidoportunidad = action.payload.oportunidad.idoportunidad;
            state.identificacion = action.payload.oportunidad.identificacion;
            state.descripcion = `Negocio ${action.payload.cantidadNegocio}`;
            state.fechainicio = Functions.dateCurrentToString();
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.negocio_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.negocio_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.negocio_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, negocio ) => {
    state.idnegocio = negocio.idnegocio;
    state.arrayactividad = [ ...negocio.arrayactividad ];
    state.fkidprograma = negocio.fkidprograma;
    state.programa = negocio.programa;
    state.fkidturno = negocio.fkidturno;
    state.turno = negocio.turno;
    state.fkidestadonegocio = negocio.fkidestadonegocio;
    state.estadonegocio = negocio.estadonegocio;
    state.fkidoportunidad = negocio.oportunidad.idoportunidad;
    state.identificacion = negocio.oportunidad.identificacion;
    state.oportunidad = negocio.oportunidad.descripcion;
    state.descripcion = negocio.descripcion;
    state.fechainicio = negocio.fechainicio;
    state.fechacierre = negocio.fechacierre;
    state.nota = negocio.nota;
    state.concurrencia = negocio.concurrencia;
    state.estado = negocio.estado;
    state.isdelete = negocio.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.fechainicio = Functions.dateCurrentToString();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
