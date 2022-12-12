
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Actividad from "../../models/oportunidad/actividad";

const inititalState = Actividad;

export const ActividadReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.actividad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.actividad_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.actividad_onCreateActividad:
            Functions.cleanObejct(state);
            state.fkidnegocio = action.payload.negocio.idnegocio;
            state.nroactividad = `Actividad ${action.payload.cantidadActividad}`;
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.actividad_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.actividad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.actividad_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, actividad ) => {
    state.idactividad = actividad.idactividad;

    state.fkidtipoactividad = actividad.fkidtipoactividad;
    state.tipoactividad = actividad.tipoactividad;

    state.fkidasesorresponsable = actividad.fkidasesorresponsable;
    state.asesorresponsable = actividad.asesorresponsable;

    state.fkidtiporesultado = actividad.fkidtiporesultado;
    state.tiporesultado = actividad.tiporesultado;

    state.fkidnegocio = actividad.fkidnegocio;
    state.negocio = actividad.negocio;

    state.descripcion = actividad.descripcion;
    state.nroactividad = actividad.nroactividad;
    state.fechaprogramada = actividad.fechaprogramada;
    state.horaprogramada = actividad.horaprogramada;

    state.fechacierre = actividad.fechacierre;
    state.nota = actividad.nota;
    state.resultado = actividad.resultado;

    state.concurrencia = actividad.concurrencia;
    state.estado = actividad.estado;
    state.isdelete = actividad.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.actividad = 'PROGRAMADA';
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
