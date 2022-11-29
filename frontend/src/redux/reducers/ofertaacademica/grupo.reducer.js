
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
            state.arraypensum = [ ...arrayPensum, onDefaultPensum() ];
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
    state.arraypensum = grupo.arraygrupopensummateriadetalle?.map( (item) => {
        return {
            fkidunidadadministrativa: item.fkidunidadadministrativa, unidadadministrativa: item.unidadadministrativa,
            fkidunidadacademica: item.fkidunidadacademica, unidadacademica: item.unidadacademica,
            fkidunidadnegocio: item.fkidunidadnegocio, unidadnegocio: item.unidadnegocio,
            fkiddocente: item.fkiddocente, docente: item.docente,
            fkidturno: item.fkidturno, turno: item.turno,
            fkidprograma: item.fkidprograma, programa: item.programa,
            fkidpensum: item.fkidpensum, pensum: item.pensum,
            fkidmateria: item.fkidmateria, materia: item.materia,
            fkiddivisionacademica: item.fkiddivisionacademica, divisionacademica: item.divisionacademica,
            fkidgestionperiodo: item.fkidgestionperiodo, gestionperiodo: item.gestionperiodo,
            cupomaximo: item.cupomaximo, disabled: true,
            arraydivisionacademica: [],
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

const onDefaultPensum = () => {
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
        arraydivisionacademica: [],
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
