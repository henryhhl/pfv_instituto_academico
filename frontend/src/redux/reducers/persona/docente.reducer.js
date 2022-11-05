
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Docente from "../../models/persona/docente";

const inititalState = Docente;

export const DocenteReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.docente_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.docente_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onAddRowNacionalidad:
            let arrayNacionalidad = state.arraynacionalidad;
            state.arraynacionalidad = [ ...arrayNacionalidad, onDefaultNacionalidad() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onDeleteRowNacionalidad:
            state.arraynacionalidad = state.arraynacionalidad.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const loadNacionalidadDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultNacionalidad() ];
    }
    return array;
};

const onDefaultNacionalidad = () => {
    return {
        fkidnacionalidad: null,
        nacionalidad: null,
    };
};

const onCreate = ( state = inititalState ) => {
    state.arraynacionalidad = loadNacionalidadDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, docente ) => {
    state.iddocente = docente.iddocente;

    state.fkidtipoidentificacion = docente.fkidtipoidentificacion;
    state.tipoidentificacion = docente.tipoidentificacion;

    state.fkidciudadnacimiento = docente.fkidciudadnacimiento;
    state.ciudadnacimiento = docente.ciudadnacimiento;

    state.fkidciudadresidencia = docente.fkidciudadresidencia;
    state.ciudadresidencia = docente.ciudadresidencia;

    state.arrayreferenciacontactos =  [];
    state.arraynacionalidad = docente.arraynacionalidad.map( ( item ) => { 
        return {
            fkidnacionalidad: item.fkidnacionalidad, nacionalidad: item.nacionalidad,
        };
     } );

    state.nombreprincipal = docente.nombreprincipal;
    state.nombreadicional = docente.nombreadicional;

    state.apellidoprimero = docente.apellidoprimero;
    state.apellidosegundo = docente.apellidosegundo;

    state.numeroidentificacion = docente.numeroidentificacion;
    state.genero = docente.genero;
    state.email = docente.email;
    state.telefono = docente.telefono;
    state.celular = docente.celular;
    state.fechanacimiento = docente.fechanacimiento;
    state.direccion = docente.direccion;
    state.uv = docente.uv;
    state.manzano = docente.manzano;
    state.barrio = docente.barrio;
    state.estadocivil = docente.estadocivil;
    state.imagen = docente.imagen;


    state.concurrencia = docente.concurrencia;
    state.estado = docente.estado;
    state.isdelete = docente.isdelete;
};
