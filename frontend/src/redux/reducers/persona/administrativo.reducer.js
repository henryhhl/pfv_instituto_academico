
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Administrativo from "../../models/persona/administrativo";

const inititalState = Administrativo;

export const AdministrativoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.administrativo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.administrativo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onAddRowNacionalidad:
            let arrayNacionalidad = state.arraynacionalidad;
            state.arraynacionalidad = [ ...arrayNacionalidad, onDefaultNacionalidad() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onDeleteRowNacionalidad:
            state.arraynacionalidad = state.arraynacionalidad.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onAddRowCategoriaDocumento:
            let arrayCategoriaDocumento = state.arraycategoriadocumento;
            state.arraycategoriadocumento = [ ...arrayCategoriaDocumento, onDefaultCategoriaDocumento() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onDeleteRowCategoriaDocumento:
            state.arraycategoriadocumento = state.arraycategoriadocumento.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onAddRowEstudio:
            let arrayEstudio = state.arrayestudio;
            state.arrayestudio = [ ...arrayEstudio, onDefaultEstudio() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.administrativo_onDeleteRowEstudio:
            state.arrayestudio = state.arrayestudio.filter( 
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
        fkidnacionalidad: null, nacionalidad: null,
    };
};

const loadCategoriaDocumentoDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultCategoriaDocumento() ];
    }
    return array;
};

const onDefaultCategoriaDocumento = () => {
    return {
        fkidcategoriadocumento: null, categoriadocumento: null,
        descripcion: "", documento: "", extension: "", estado: "A",
    };
};

const loadEstudioDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultEstudio() ];
    }
    return array;
};

const onDefaultEstudio = () => {
    return {
        fkidinstitucion: null, institucion: null,
        fkidnivelacademico: null, nivelacademico: null,
        descripcion: "", esgraduado: "S",
        ultimoyearcursado: 0, estado: "A",
    };
};

const onCreate = ( state = inititalState ) => {
    state.arraycategoriadocumento = loadCategoriaDocumentoDetalle();
    state.arraynacionalidad = loadNacionalidadDetalle();
    state.arrayestudio = loadEstudioDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, administrativo ) => {
    state.idadministrativo = administrativo.idadministrativo;

    state.fkidtipoidentificacion = administrativo.fkidtipoidentificacion;
    state.tipoidentificacion = administrativo.tipoidentificacion;

    state.fkidciudadnacimiento = administrativo.fkidciudadnacimiento;
    state.ciudadnacimiento = administrativo.ciudadnacimiento;

    state.fkidciudadresidencia = administrativo.fkidciudadresidencia;
    state.ciudadresidencia = administrativo.ciudadresidencia;

    state.arrayreferenciacontactos =  [];
    state.arraynacionalidad = administrativo.arraynacionalidad.map( ( item ) => { 
        return {
            fkidnacionalidad: item.fkidnacionalidad, nacionalidad: item.nacionalidad,
        };
    } );

    state.arraycategoriadocumento = administrativo.arraycategoriadocumento.map( ( item ) => { 
        return {
            fkidcategoriadocumento: item.fkidcategoriadocumento, categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion, documento: item.documento,
            extension: item.extension, estado: item.estado,
        };
    } );

    state.arrayestudio = administrativo.arrayestudio.map( ( item ) => { 
        return {
            fkidinstitucion: item.fkidinstitucion, institucion: item.institucion,
            fkidnivelacademico: item.fkidnivelacademico, nivelacademico: item.nivelacademico,
            descripcion: item.descripcion, esgraduado: item.esgraduado,
            ultimoyearcursado: item.ultimoyearcursado, estado: item.estado,
        };
    } );

    state.nombreprincipal = administrativo.nombreprincipal;
    state.nombreadicional = administrativo.nombreadicional;

    state.apellidoprimero = administrativo.apellidoprimero;
    state.apellidosegundo = administrativo.apellidosegundo;

    state.numeroidentificacion = administrativo.numeroidentificacion;
    state.genero = administrativo.genero;
    state.email = administrativo.email;
    state.telefono = administrativo.telefono;
    state.celular = administrativo.celular;
    state.fechanacimiento = administrativo.fechanacimiento;
    state.direccion = administrativo.direccion;
    state.uv = administrativo.uv;
    state.manzano = administrativo.manzano;
    state.barrio = administrativo.barrio;
    state.estadocivil = administrativo.estadocivil;
    state.imagen = administrativo.imagen;


    state.concurrencia = administrativo.concurrencia;
    state.estado = administrativo.estado;
    state.isdelete = administrativo.isdelete;
};
