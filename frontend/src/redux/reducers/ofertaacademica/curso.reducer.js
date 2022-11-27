
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Curso from "../../models/ofertaacademica/curso";

const inititalState = Curso;

export const CursoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.curso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.curso_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onAddRowDocente:
            let arrayDocente = state.arraydocente;
            state.arraydocente = [ ...arrayDocente, onDefaultDocente() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onDeleteRowDocente:
            state.arraydocente = state.arraydocente.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
        
        default:
            return state;
    }
};

const loadDocenteDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultDocente() ];
    }
    return array;
};

const onDefaultDocente = () => {
    return {
        fkiddocente: null, docente: null,
        contenido: "", estado: "A",
        error: { 
            fkiddocente: false, estado: false,
        },
        message: { 
            fkiddocente: "", estado: "",
        },
    };
};

const onCreate = ( state = inititalState ) => {
    state.arraydocente = loadDocenteDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, curso ) => {
    state.idcurso = curso.idcurso;

    state.fkidunidadnegocio = curso.fkidunidadnegocio;
    state.unidadnegocio = curso.unidadnegocio;

    state.fkidunidadadministrativa = curso.fkidunidadadministrativa;
    state.unidadadministrativa = curso.unidadadministrativa;

    state.fkidunidadacademica = curso.fkidunidadacademica;
    state.unidadacademica = curso.unidadacademica;

    state.fkidmodalidadacademica = curso.fkidmodalidadacademica;
    state.modalidadacademica = curso.modalidadacademica;

    state.fkidturno = curso.fkidturno;
    state.turno = curso.turno;

    state.fkidmateria = curso.fkidmateria;
    state.materia = curso.materia;

    state.fkidgestionperiodo = curso.fkidgestionperiodo;
    state.gestionperiodo = curso.gestionperiodo;

    state.arraydocente = curso.arraydocente.map( ( item ) => { 
        return {
            fkiddocente: item.fkiddocente, docente: item.docente,
            contenido: item.contenido, estado: item.estado,
            error: { 
                fkiddocente: false, estado: false,
            },
            message: { 
                fkiddocente: "", estado: "",
            },
        };
    } );

    state.sigla = curso.sigla;
    state.descripcion = curso.descripcion;
    state.cupo = curso.cupo;

    state.fechainicio = curso.fechainicio;
    state.fechafinal = curso.fechafinal;

    state.version = curso.version;
    state.prerequisito = curso.prerequisito;
    state.objetivo = curso.objetivo;
    state.cantidadhora = curso.cantidadhora;
    state.inversionbase = curso.inversionbase;

    state.fkidmotivoaperturacierrecurso = curso.fkidmotivoaperturacierrecurso;
    state.motivoaperturacierrecurso = curso.motivoaperturacierrecurso;

    state.fkidadministrativo = curso.fkidadministrativo;
    state.administrativo = curso.administrativo;

    state.observaciones = curso.observaciones;
    state.fechaoperacion = curso.fechaoperacion;
    state.estadoproceso = curso.estadoproceso;

    state.concurrencia = curso.concurrencia;
    state.estado = curso.estado;
    state.isdelete = curso.isdelete;
};
