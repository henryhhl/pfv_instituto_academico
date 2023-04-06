
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

        case Constants.curso_onAddRowParametroCalificacion:
            let arrayParametroCalificacion = state.arrayparametrocalificacion;
            state.arrayparametrocalificacion = [ ...arrayParametroCalificacion, {
                idcursoparametrocalificacion: null,
                fkidparametrocalificacion: null,
                parametrocalificacion: null,
                valorporcentaje: null,
            } ];
            state = Object.assign( {}, state );
            return state;

        case Constants.curso_onDeleteRowParametroCalificacion:
            const parametroCalificacion = state.arrayparametrocalificacion[action.payload];
            if ( action.payload.idcursoparametrocalificacion !== null ) {
                state.arrayparametrocalificaciondelete = [ ...state.arrayparametrocalificaciondelete, parametroCalificacion ];
            }
            state.arrayparametrocalificacion = state.arrayparametrocalificacion.filter( 
                (item, index) => action.payload !== index 
            );
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
    console.log(curso)
    state.idcurso = curso.idcurso;

    state.fkidunidadnegocio = curso.unidadNegocio.idunidadnegocio;
    state.unidadnegocio = curso.unidadNegocio.descripcion;

    state.fkidunidadadministrativa = curso.unidadAdministrativa.idunidadadministrativa;
    state.unidadadministrativa = curso.unidadAdministrativa.descripcion;

    state.fkidunidadacademica = curso.unidadAcademica.idunidadacademica;
    state.unidadacademica = curso.unidadAcademica.descripcion;

    state.fkidmodalidadacademica = curso.modalidadAcademica.idmodalidadacademica;
    state.modalidadacademica = curso.modalidadAcademica.descripcion;

    state.fkidturno = curso.turno.idturno;
    state.turno = curso.turno.descripcion;

    state.fkidmateria = curso.materia.idmateria;
    state.materia = curso.materia.nombrelargo;

    state.fkidaula = curso.aula.idaula;
    state.aula = curso.aula.descripcion;

    state.fkidgestionperiodo = curso.gestionPeriodo.idgestionperiodo;
    state.gestionperiodo = curso.gestionPeriodo.descripcion;

    state.arraydocente = curso.arraydocente.map( ( item ) => { 
        return {
            fkiddocente: item.docente.iddocente, 
            docente: `${item.docente.nombreprincipal} ${item.docente.nombreadicional} ${item.docente.apellidoprimero} ${item.docente.apellidosegundo}`,
            contenido: item.contenido, estado: item.estado,
            error: { 
                fkiddocente: false, estado: false,
            },
            message: { 
                fkiddocente: "", estado: "",
            },
        };
    } );

    state.arrayparametrocalificacion = curso.arrayCursoParametroCalificacion.map( (item) => {
        return {
            idcursoparametrocalificacion: item.idcursoparametrocalificacion,
            fkidparametrocalificacion: item.parametroCalificacion.idparametrocalificacion,
            parametrocalificacion: item.parametroCalificacion.descripcion,
            valorporcentaje: item.valorporcentaje,
        };
    } );

    state.sigla = curso.sigla;
    state.descripcion = curso.descripcion;
    state.cupo = curso.cupo;

    state.fechainicio = curso.fechainicio;
    state.fechafinal = curso.fechafinal;

    state.horainicio = curso.horainicio;
    state.horafinal = curso.horafinal;

    state.version = curso.version;
    state.prerequisito = curso.prerequisito;
    state.objetivo = curso.objetivo;
    state.cantidadhora = curso.cantidadhora;
    state.inversionbase = curso.inversionbase;

    state.fkidmotivoaperturacierrecurso = curso.motivoAperturaCierreCurso === null ? '' : curso.motivoAperturaCierreCurso.idmotivoaperturacierrecurso;
    state.motivoaperturacierrecurso = curso.motivoAperturaCierreCurso === null ? '' : curso.motivoAperturaCierreCurso.descripcion;

    state.fkidadministrativo = curso.administrativo === null ? '' : curso.administrativo.idadministrativo;
    state.administrativo = curso.administrativo === null ? '' : `${curso.administrativo.nombreprincipal} ${curso.administrativo.nombreadicional} ${curso.administrativo.apellidoprimero} ${curso.administrativo.apellidosegundo}`;

    state.observaciones = curso.observaciones;
    state.fechaoperacion = curso.fechaoperacion;
    state.estadoproceso = curso.estadoproceso;

    state.concurrencia = curso.concurrencia;
    state.estado = curso.estado;
    state.isdelete = curso.isdelete;
};
