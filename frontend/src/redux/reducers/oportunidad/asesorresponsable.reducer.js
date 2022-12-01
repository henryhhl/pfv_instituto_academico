
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import AsesorResponsable from "../../models/oportunidad/asesorresponsable";

const inititalState = AsesorResponsable;

export const AsesorResponsableReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.asesorresponsable_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.asesorresponsable_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.asesorresponsable_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.asesorresponsable_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.asesorresponsable_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, asesorResponsable ) => {
    state.idasesorresponsable = asesorResponsable.idasesorresponsable;

    state.fkidtipoidentificacion = asesorResponsable.fkidtipoidentificacion;
    state.tipoidentificacion = asesorResponsable.tipoidentificacion;

    state.fkidciudadnacimiento = asesorResponsable.fkidciudadnacimiento;
    state.ciudadnacimiento = asesorResponsable.ciudadnacimiento;

    state.fkidciudadresidencia = asesorResponsable.fkidciudadresidencia;
    state.ciudadresidencia = asesorResponsable.ciudadresidencia;

    state.nombreprincipal = asesorResponsable.nombreprincipal;
    state.nombreadicional = asesorResponsable.nombreadicional;

    state.apellidoprimero = asesorResponsable.apellidoprimero;
    state.apellidosegundo = asesorResponsable.apellidosegundo;

    state.comision = asesorResponsable.comision;
    state.valorporcentaje = asesorResponsable.valorporcentaje;

    state.numeroidentificacion = asesorResponsable.numeroidentificacion;
    state.genero = asesorResponsable.genero;
    state.email = asesorResponsable.email;
    state.telefono = asesorResponsable.telefono;
    state.celular = asesorResponsable.celular;
    state.fechanacimiento = asesorResponsable.fechanacimiento;
    state.direccion = asesorResponsable.direccion;
    state.uv = asesorResponsable.uv;
    state.manzano = asesorResponsable.manzano;
    state.barrio = asesorResponsable.barrio;
    state.estadocivil = asesorResponsable.estadocivil;
    state.imagen = asesorResponsable.imagen;

    state.concurrencia = asesorResponsable.concurrencia;
    state.estado = asesorResponsable.estado;
    state.isdelete = asesorResponsable.isdelete;
};
