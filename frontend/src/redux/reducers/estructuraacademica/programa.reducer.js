
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Programa from "../../models/estructuraacademica/programa";

const inititalState = Programa;

export const ProgramaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.programa_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onCreate:
            Functions.cleanObejct(state);
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onShow:
            Functions.cleanObejct(state);
            state.idprograma = action.payload.idprograma;

            state.fkidunidadnegocio = action.payload.fkidunidadnegocio;
            state.unidadnegocio = action.payload.unidadnegocio;

            state.fkidunidadadministrativa = action.payload.fkidunidadadministrativa;
            state.unidadadministrativa = action.payload.unidadadministrativa;

            state.fkidunidadacademica = action.payload.fkidunidadacademica;
            state.unidadacademica = action.payload.unidadacademica;

            state.fkidnivelacademico = action.payload.fkidnivelacademico;
            state.nivelacademico = action.payload.nivelacademico;

            state.fkidmodalidadacademica = action.payload.fkidmodalidadacademica;
            state.modalidadacademica = action.payload.modalidadacademica;

            state.arraymallacurricular = action.payload.arraydivisionacademica.map( ( item ) => { 
                return {
                    fkiddivisionacademica: item.fkiddivisionacademica, divisionacademica: item.divisionacademica,
                    estado: item.estado, 
                    arraymateria: item.arraymateria.map( (detail) => {
                        return {
                            fkidmateria: detail.fkidmateria,
                            codmateria: detail.codmateria,
                            siglamateria: detail.siglamateria,
                            materia: detail.materia,
                            estado: detail.estado,
                        };
                    } ),
                };
            } );

            state.codigo = action.payload.codigo;
            state.sigla = action.payload.sigla;
            state.descripcion = action.payload.descripcion;

            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.programa_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onAddRowMallaCurricular:
            if ( state.fkiddivisionacademica !== "" || state.fkiddivisionacademica !== null ) {
                let arrayMallaCurricular = state.arraymallacurricular;
                state.arraymallacurricular = [ ...arrayMallaCurricular, onDefaultMallaCurricular(state) ];
                state.fkiddivisionacademica = "";
                state.divisionacademica = "";
                state = Object.assign( {}, state );
            }
            return state;

        case Constants.programa_onDeleteRowMallaCurricular:
            state.arraymallacurricular = state.arraymallacurricular.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onAddRowMateriaDetail:
            let detalle = state.arraymallacurricular[action.payload.index];
            let objMateria = {
                fkidmateria: action.payload.materia.idmateria,
                codmateria: action.payload.materia.codigo,
                siglamateria: action.payload.materia.sigla,
                materia: action.payload.materia.nombrelargo,
                estado: "A",
            };
            detalle.arraymateria = [ ...detalle.arraymateria, objMateria ];
            state = Object.assign( {}, state );
            return state;

        case Constants.programa_onDeletRowMateriaDetail:
            const indexMallaCurricular = action.payload.indexMallaCurricular;
            state.arraymallacurricular[indexMallaCurricular].arraymateria = state.arraymallacurricular[indexMallaCurricular].arraymateria.filter( 
                (item, index) => action.payload.indexMateria !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onDefaultMallaCurricular = (programa) => {
    return {
        fkiddivisionacademica: programa.fkiddivisionacademica, idprogramadivisionacademicadetalle: null,
        divisionacademica: programa.divisionacademica, estado: "A", arraymateria: [],
    };
};
