
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Grupo from "../../models/ofertaacademica/grupo";

const inititalState = Grupo;

export const GrupoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.grupo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.grupo_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.grupo_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.grupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.grupo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.grupo_onAddRowPensum:
            let arrayPensum = state.arraypensum;
            state.arraypensum = [ ...arrayPensum, onDefaultPensum(action.payload) ];
            state = Object.assign( {}, state );
            return state;

        case Constants.grupo_onDeleteRowPensum:
            state.arraypensum = state.arraypensum.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, grupo ) => {
    state.idgrupo = grupo.idgrupo;
    state.sigla = grupo.sigla;
    state.arraypensum = grupo.arrayGrupoMateriaDetalle?.map( (item) => {
        return {
            fkidunidadadministrativa: item.unidadAdministrativa.idunidadadministrativa, 
            unidadadministrativa: item.unidadAdministrativa.descripcion,
            fkidunidadacademica: item.unidadAcademica.idunidadacademica, 
            unidadacademica: item.unidadAcademica.descripcion,
            fkidunidadnegocio: item.unidadNegocio.idunidadnegocio, 
            unidadnegocio: item.unidadNegocio.descripcion,
            fkiddocente: item.docente.iddocente, 
            docente: `${item.docente.nombreprincipal} ${item.docente.nombreadicional} ${item.docente.apellidoprimero} ${item.docente.apellidosegundo}`,
            fkidturno: item.turno.idturno, turno: item.turno.descripcion,
            fkidprograma: item.programa.idprograma, programa: item.programa.descripcion,
            fkidpensum: item.pensum.idpensum, pensum: item.pensum.descripcion,
            fkidmateria: item.materia.idmateria, materia: item.materia.nombrelargo,
            fkiddivisionacademica: item.divisionAcademica.iddivisionacademica, divisionacademica: item.divisionAcademica.descripcion,
            fkidgestionperiodo: item.gestionPeriodo.idgestionperiodo, gestionperiodo: item.gestionPeriodo.descripcion,
            cupomaximo: item.cupomaximo, disabled: true,
            arraydia: item.arrayGrupoMateriaDiaDetalle.map( ( diaDetalle ) => {
                return {
                    iddia: diaDetalle.dia.iddia,
                    sigla: diaDetalle.dia.sigla,
                    descripcion: diaDetalle.dia.descripcion,
                    arrayhorario: diaDetalle.arrayGrupoMateriaDiaHorario.map( ( horario ) => {
                        return {
                            horainicio: horario.horainicio,
                            horafinal: horario.horafinal,
                            fkiddia: diaDetalle.dia.iddia,
                            dia: diaDetalle.dia.descripcion,
                            fkidaula: horario.aula.idaula,
                            aula: horario.aula.sigla,
                        };
                    } ),
                };
            } ),
            arraydivisionacademica: item.pensum.arraydivisionacademica,
            arrayparametrocalificacion: item?.arrayGrupoMateriaCalificacionDetalle.map( (item) => {
                return {
                    fkidparametrocalificacion: item.parametroCalificacion.idparametrocalificacion,
                    parametrocalificacion: item.parametroCalificacion.descripcion,
                    valorporcentaje: item.valorporcentaje,
                };
            } ),
            error: {
                fkidpensum: false, fkiddocente: false, fkidturno: false, fkidgestionperiodo: false,
                fkidmateria: false, fkiddivisionacademica: false, cupomaximo: false,
            },
            message: {
                fkidpensum: "", fkiddocente: "", fkidturno: "", fkidgestionperiodo: "",
                fkidmateria: "", fkiddivisionacademica: "", cupomaximo: "",
            },
        };
    } );
    state.concurrencia = grupo.concurrencia;
    state.estado = grupo.estado;
    state.isdelete = grupo.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}

const onDefaultPensum = (arrayDays = []) => {
    return {
        fkidunidadadministrativa: null, unidadadministrativa: null,
        fkidunidadacademica: null, unidadacademica: null, fkidunidadnegocio: null, unidadnegocio: null,
        // fkidmodalidadacademica: null, modalidadacademica: null, 
        fkiddocente: null, docente: null,
        fkidturno: null, turno: null, fkidprograma: null, programa: null, fkidpensum: null, pensum: null,
        fkidmateria: null, materia: null, cupomaximo: "", fkiddivisionacademica: null, divisionacademica: null,
        fkidgestionperiodo: null, gestionperiodo: null, 
        // fechacierre: "", 
        // fkidmotivoaperturacierrecurso: null, motivoaperturacierrecurso: null, observaciones: "", estadoproceso: "N",
        arraydia: arrayDays.map( (item) => {
            return {
                iddia: item.iddia,
                sigla: item.sigla,
                descripcion: item.descripcion,
                arrayhorario: [],
            };
        } ),
        arraydivisionacademica: [],
        arrayparametrocalificacion: [],
        error: {
            fkidpensum: false, fkiddocente: false, fkidturno: false, fkidgestionperiodo: false,
            fkidmateria: false, fkiddivisionacademica: false, cupomaximo: false,
        },
        message: {
            fkidpensum: "", fkiddocente: "", fkidturno: "", fkidgestionperiodo: "",
            fkidmateria: "", fkiddivisionacademica: "", cupomaximo: "",
        },
        disabled: false,
    };
};
