
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

        case Constants.docente_onAddRowMateria:
            let arrayMateria = state.arraymateria;
            state.arraymateria = [ ...arrayMateria, onDefaultMateria() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onDeleteRowMateria:
            state.arraymateria = state.arraymateria.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onAddRowCategoriaDocumento:
            let arrayCategoriaDocumento = state.arraycategoriadocumento;
            state.arraycategoriadocumento = [ ...arrayCategoriaDocumento, onDefaultCategoriaDocumento() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onDeleteRowCategoriaDocumento:
            state.arraycategoriadocumento = state.arraycategoriadocumento.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onAddRowEstudio:
            let arrayEstudio = state.arrayestudio;
            state.arrayestudio = [ ...arrayEstudio, onDefaultEstudio() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.docente_onDeleteRowEstudio:
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

const loadMateriaDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultMateria() ];
    }
    return array;
};

const onDefaultMateria = () => {
    return {
        fkidmateria: null, materia: null,
        tipoprioridad: "A", estado: "A",
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
    state.arraynacionalidad = loadNacionalidadDetalle();
    state.arraymateria = loadMateriaDetalle();
    state.arraycategoriadocumento = loadCategoriaDocumentoDetalle();
    state.arrayestudio = loadEstudioDetalle();
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
    state.arraycategoriadocumento = docente.arraycategoriadocumento.map( ( item ) => { 
        return {
            fkidcategoriadocumento: item.fkidcategoriadocumento, categoriadocumento: item.categoriadocumento,
            descripcion: item.descripcion, documento: item.documento, extension: item.extension, estado: item.estado,
        };
    } );

    state.arraymateria = docente.arraymateria.map( ( item ) => { 
        return {
            fkidmateria: item.fkidmateria, materia: item.materia,
            tipoprioridad: item.tipoprioridad, estado: item.estado,
        };
    } );

    state.arrayestudio = docente.arrayestudio.map( ( item ) => { 
        return {
            fkidinstitucion: item.fkidinstitucion, institucion: item.institucion,
            fkidnivelacademico: item.fkidnivelacademico, nivelacademico: item.nivelacademico,
            descripcion: item.descripcion, esgraduado: item.esgraduado,
            ultimoyearcursado: item.ultimoyearcursado, estado: item.estado,
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
