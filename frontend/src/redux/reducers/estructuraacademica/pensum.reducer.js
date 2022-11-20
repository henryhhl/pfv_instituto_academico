
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Pensum from "../../models/estructuraacademica/pensum";

const inititalState = Pensum;

export const PensumReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.pensum_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onCreate:
            onCreate( state );
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onShow:
            onSetData(state, action.payload);
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.pensum_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onAddRowDivisionAcademica:
            let objDivisionAcademica = {
                divisionacademica: action.payload,
                arraymateria: [],
                estado: "A",
            };
            state.arraydivisionacademica = [ ...state.arraydivisionacademica, objDivisionAcademica ];
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onDeleteRowDivisionAcademica:
            state.arraydivisionacademica = state.arraydivisionacademica.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onAddRowMateriaDetails:
            let detalle = state.arraydivisionacademica[action.payload.index];
            detalle.arraymateria = [ ...detalle.arraymateria, action.payload.materia ];
            state = Object.assign( {}, state );
            return state;

        case Constants.pensum_onDeleteRowMateriaDetails:
            const index = action.payload.indexDivisionAcademica;
            state.arraydivisionacademica[index].arraymateria = state.arraydivisionacademica[index].arraymateria.filter( 
                (item, index) => action.payload.indexMateria !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    Functions.cleanObejct(state);
    state.estadoproceso = 'Vigente';
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, pensum ) => {
    Functions.cleanObejct(state);
    state.idpensum = pensum.idpensum;

    state.fkidunidadnegocio = pensum.fkidunidadnegocio;
    state.unidadnegocio = pensum.unidadnegocio;

    state.fkidunidadadministrativa = pensum.fkidunidadadministrativa;
    state.unidadadministrativa = pensum.unidadadministrativa;

    state.fkidunidadacademica = pensum.fkidunidadacademica;
    state.unidadacademica = pensum.unidadacademica;

    state.fkidprograma = pensum.fkidprograma;
    state.programa = pensum.programa;

    state.descripcion = pensum.descripcion;
    state.fechaaprobacion = pensum.fechaaprobacion;
    state.estadoproceso = pensum.estadoproceso;
    state.nota = pensum.nota;

    state.arraydivisionacademica = pensum.arraydivisionacademica.map( ( item ) => {
        return {
            divisionacademica: item.divisionacademica,
            estado: item.estado, 
            arraymateria: item.arraymateria.map( (detail) => {
                return {
                    materia: detail.materia,
                    tipomateria: detail.tipomateria,
                    secuencia: detail.secuencia,
                    notaminima: detail.notaminima,
                    notamaxima: detail.notamaxima,
                    horateorica: detail.horateorica,
                    horapractica: detail.horapractica,
                    horasociales: detail.horasociales,
                    cuporequerido: detail.cuporequerido,
                    estado: detail.estado,
                };
            } ),
        };
    } );

    state.estado = pensum.estado;
    state.concurrencia = pensum.concurrencia;
    state.isdelete = pensum.isdelete;
};
