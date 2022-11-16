
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Estudiante from "../../models/persona/estudiante";

const inititalState = Estudiante;

export const EstudianteReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.estudiante_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.estudiante_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onAddRowNacionalidad:
            let arrayNacionalidad = state.arraynacionalidad;
            state.arraynacionalidad = [ ...arrayNacionalidad, onDefaultNacionalidad() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onDeleteRowNacionalidad:
            state.arraynacionalidad = state.arraynacionalidad.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onAddRowCategoriaDocumento:
            let arrayCategoriaDocumento = state.arraycategoriadocumento;
            state.arraycategoriadocumento = [ ...arrayCategoriaDocumento, onDefaultCategoriaDocumento() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onDeleteRowCategoriaDocumento:
            state.arraycategoriadocumento = state.arraycategoriadocumento.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onAddRowFamiliar:
            let arrayFamiliar = state.arrayfamiliar;
            state.arrayfamiliar = [ ...arrayFamiliar, onDefaultFamiliar() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.estudiante_onDeleteRowFamiliar:
            state.arrayfamiliar = state.arrayfamiliar.filter( 
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
        descripcion: "", documento: "",
        extension: "", estado: "A",
    };
};

const loadFamiliarDetalle = () => {
    let array = [];
    for (let index = 0; index < 1; index++) {
        array = [ ...array, onDefaultFamiliar() ];
    }
    return array;
};

const onDefaultFamiliar = () => {
    return {
        fkidtipoidentificacion: null, tipoidentificacion: null,
        fkidciudadnacimiento: null, ciudadnacimiento: null,
        fkidciudadresidencia: null, ciudadresidencia: null,
        nombreprincipal: "", nombreadicional: "",
        apellidoprimero: "", apellidosegundo: "", numeroidentificacion: "",
        genero: "", email: "", telefono: "", celular: "", fechanacimiento: "",
        direccion: "", uv: "", manzano: "", barrio: "", estadocivil: "", imagen: "",
        tiporelacion: "", profesion: "", tipoempleado: "N", direccionempresa: "",
        fkidnivelacademico: "", nivelacademico: "", especialidad: "", tiposangre: "",
        estado: "A", 
        error: { 
            nombreprincipal: false, apellidoprimero: false, fkidtipoidentificacion: false,
            numeroidentificacion: false, genero: false, estadocivil: false, fkidciudadnacimiento: false,
            fkidciudadresidencia: false, fechanacimiento: false, tiporelacion: false, email: false,
        },
        message: { 
            nombreprincipal: "", apellidoprimero: "", fkidtipoidentificacion: "",
            numeroidentificacion: "", genero: "", estadocivil: "", fkidciudadnacimiento: "",
            fkidciudadresidencia: "", fechanacimiento: "", tiporelacion: "", email: "",
        },
    };
};

const onCreate = ( state = inititalState ) => {
    state.arraynacionalidad = loadNacionalidadDetalle();
    state.arraycategoriadocumento = loadCategoriaDocumentoDetalle();
    state.arrayfamiliar = loadFamiliarDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, estudiante ) => {
    state.idestudiante = estudiante.idestudiante;

    state.fkidtipoidentificacion = estudiante.fkidtipoidentificacion;
    state.tipoidentificacion = estudiante.tipoidentificacion;

    state.fkidciudadnacimiento = estudiante.fkidciudadnacimiento;
    state.ciudadnacimiento = estudiante.ciudadnacimiento;

    state.fkidciudadresidencia = estudiante.fkidciudadresidencia;
    state.ciudadresidencia = estudiante.ciudadresidencia;

    state.arraynacionalidad = estudiante.arraynacionalidad.map( ( item ) => { 
        return {
            fkidnacionalidad: item.fkidnacionalidad, nacionalidad: item.nacionalidad,
        };
     } );
    state.arraycategoriadocumento = estudiante.arraycategoriadocumento.map( ( item ) => { 
        return {
            fkidcategoriadocumento: item.fkidcategoriadocumento, categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion, documento: item.documento, extension: item.extension, estado: item.estado,
        };
    } );
    state.arrayfamiliar = estudiante.arrayfamiliar.map( ( item ) => { 
        return {
            fkidtipoidentificacion: item.fkidtipoidentificacion, tipoidentificacion: item.tipoidentificacion,
            fkidciudadnacimiento: item.fkidciudadnacimiento, ciudadnacimiento: item.ciudadnacimiento,
            fkidciudadresidencia: item.fkidciudadresidencia, ciudadresidencia: item.ciudadresidencia,
            numeroregistro: item.numeroregistro, nombreprincipal: item.nombreprincipal, nombreadicional: item.nombreadicional,
            apellidoprimero: item.apellidoprimero, apellidosegundo: item.apellidosegundo, numeroidentificacion: item.numeroidentificacion,
            genero: item.genero, email: item.email, telefono: item.telefono, celular: item.celular, fechanacimiento: item.fechanacimiento,
            direccion: item.direccion, uv: item.uv, manzano: item.manzano, barrio: item.barrio, estadocivil: item.estadocivil, imagen: item.imagen,
            tiporelacion: item.tiporelacion, profesion: item.profesion, tipoempleado: item.tipoempleado, direccionempresa: item.direccionempresa,
            fkidnivelacademico: item.fkidnivelacademico, nivelacademico: item.nivelacademico, especialidad: item.especialidad, tiposangre: item.tiposangre,
            estado: item.estado,
            error: { 
                nombreprincipal: false, apellidoprimero: false, fkidtipoidentificacion: false,
                numeroidentificacion: false, genero: false, estadocivil: false, fkidciudadnacimiento: false,
                fkidciudadresidencia: false, fechanacimiento: false, tiporelacion: false, email: false,
            },
            message: { 
                nombreprincipal: "", apellidoprimero: "", fkidtipoidentificacion: "",
                numeroidentificacion: "", genero: "", estadocivil: "", fkidciudadnacimiento: "",
                fkidciudadresidencia: "", fechanacimiento: "", tiporelacion: "", email: "",
            },
        };
    } );

    state.numeroregistro = estudiante.numeroregistro;
    state.nombreprincipal = estudiante.nombreprincipal;
    state.nombreadicional = estudiante.nombreadicional;

    state.apellidoprimero = estudiante.apellidoprimero;
    state.apellidosegundo = estudiante.apellidosegundo;

    state.numeroidentificacion = estudiante.numeroidentificacion;
    state.genero = estudiante.genero;
    state.email = estudiante.email;
    state.telefono = estudiante.telefono;
    state.celular = estudiante.celular;
    state.fechanacimiento = estudiante.fechanacimiento;
    state.direccion = estudiante.direccion;
    state.uv = estudiante.uv;
    state.manzano = estudiante.manzano;
    state.barrio = estudiante.barrio;
    state.estadocivil = estudiante.estadocivil;
    state.imagen = estudiante.imagen;


    state.concurrencia = estudiante.concurrencia;
    state.estado = estudiante.estado;
    state.isdelete = estudiante.isdelete;
};
