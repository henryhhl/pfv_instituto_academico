
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Institucion from "../../models/estructurainstitucional/institucion";

const inititalState = Institucion;

export const InstitucionReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.institucion_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.institucion_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.institucion_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.institucion_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.institucion_onLimpiar:
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
}

const onSetData = ( state = inititalState, turno ) => {
    state.idinstitucion = turno.idinstitucion;
    state.fkidciudad = turno.fkidciudad;
    state.ciudad = turno.ciudad;
    state.sigla = turno.sigla;
    state.descripcion = turno.descripcion;
    state.nit = turno.nit;
    state.telefono = turno.telefono;
    state.celular = turno.celular;
    state.direccion = turno.direccion;
    state.email = turno.email;
    state.concurrencia = turno.concurrencia;
    state.estado = turno.estado;
    state.isdelete = turno.isdelete;
}
