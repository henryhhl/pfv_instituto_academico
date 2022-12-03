
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Oportunidad from "../../models/oportunidad/oportunidad";

const inititalState = Oportunidad;

export const OportunidadReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.oportunidad_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.oportunidad_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.oportunidad_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.oportunidad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.oportunidad_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.oportundiad_onAddRowTipoContacto:
            let arrayTipoContacto = state.arraytipocontacto;
            state.arraytipocontacto = [ ...arrayTipoContacto, onDefaultTipoContacto() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.oportundiad_onDeleteRowTipoContacto:
            state.arraytipocontacto = state.arraytipocontacto.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
            
        case Constants.oportundiad_onAddRowTipoMedioPublicitario:
            let arrayTipoMedioPublicitario = state.arraytipomediopublicitario;
            state.arraytipomediopublicitario = [ ...arrayTipoMedioPublicitario, onDefaultTipoMedioPublicitario() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.oportundiad_onDeleteRowTipoMedioPublicitario:
            state.arraytipomediopublicitario = state.arraytipomediopublicitario.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, oportunidad ) => {
    state.idoportunidad = oportunidad.idoportunidad;

    state.fkidciudadorigen = oportunidad.fkidciudadorigen;
    state.ciudadorigen = oportunidad.ciudadorigen;

    state.fkidasesorresponsable = oportunidad.fkidasesorresponsable;
    state.asesorresponsable = oportunidad.asesorresponsable;

    state.descripcion = oportunidad.descripcion;
    state.identificacion = oportunidad.identificacion;
    state.celular = oportunidad.celular;
    state.email = oportunidad.email;
    state.direccion = oportunidad.direccion;
    state.barrio = oportunidad.barrio;
    state.fecharegistro = oportunidad.fecharegistro;
    state.horaregistro = oportunidad.horaregistro;
    state.nota = oportunidad.nota;

    state.concurrencia = oportunidad.concurrencia;
    state.estado = oportunidad.estado;
    state.isdelete = oportunidad.isdelete;

    state.arraytipocontacto = oportunidad.arraytipocontacto.map( ( item ) => { 
        return {
            fkidtipocontacto: item.fkidtipocontacto, tipocontacto: item.tipocontacto,
            detalle: item.detalle, estado: item.estado,
        };
    } );

    state.arraytipomediopublicitario = oportunidad.arraytipomediopublicitario.map( ( item ) => { 
        return {
            fkidtipomediopublicitario: item.fkidtipomediopublicitario, tipomediopublicitario: item.tipomediopublicitario,
            detalle: item.detalle, estado: item.estado,
        };
    } );
}

const onCreate = ( state = inititalState ) => {
    state.arraytipocontacto = loadTipoContactoDetalle();
    state.arraytipomediopublicitario = loadTipoMedioPublicitarioDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}

const loadTipoContactoDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultTipoContacto() ];
    }
    return array;
};

const onDefaultTipoContacto = () => {
    return {
        fkidtipocontacto: null, tipocontacto: null, 
        detalle: null, estado: "A",
    };
};

const loadTipoMedioPublicitarioDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultTipoMedioPublicitario() ];
    }
    return array;
};

const onDefaultTipoMedioPublicitario = () => {
    return {
        fkidtipomediopublicitario: null, tipomediopublicitario: null, 
        detalle: null, estado: "A",
    };
};
