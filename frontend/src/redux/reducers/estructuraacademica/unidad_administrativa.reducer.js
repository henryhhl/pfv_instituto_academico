
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import UnidadAdministrativa from "../../models/estructuraacademica/unidad_administrativa";

const inititalState = UnidadAdministrativa;

export const UnidadAdministrativaReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.unidadadministrativa_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onCreate:
            Functions.cleanObejct(state);
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onShow:
            Functions.cleanObejct(state);
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.unidadadministrativa_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onAddRowTurno:
            let arrayTurno = state.arrayturno;
            state.arrayturno = [ ...arrayTurno, onDefaultTurno() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onDeleteRowTurno:
            state.arrayturno = state.arrayturno.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onAddRowAula:
            let arrayAula = state.arrayaula;
            state.arrayaula = [ ...arrayAula, onDefaultAula() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.unidadadministrativa_onDeleteRowAula:
            state.arrayaula = state.arrayaula.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onCreate = ( state = inititalState ) => {
    state.arrayturno = loadTurnoDetalle();
    state.arrayaula = loadAulaDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, unidadAdministrativa ) => {
    state.idunidadadministrativa = unidadAdministrativa.idunidadadministrativa;
    state.fkidunidadnegocio = unidadAdministrativa.fkidunidadnegocio;
    state.unidadnegocio = unidadAdministrativa.unidadnegocio;
    state.sigla = unidadAdministrativa.sigla;
    state.descripcion = unidadAdministrativa.descripcion;
    state.concurrencia = unidadAdministrativa.concurrencia;
    state.estado = unidadAdministrativa.estado;
    state.isdelete = unidadAdministrativa.isdelete;

    state.arrayturno = unidadAdministrativa.arrayturno.map( ( item ) => { 
        return {
            fkidturno: item.fkidturno, turno: item.turno, estado: item.estado,
        };
    } );

    state.arrayaula = unidadAdministrativa.arrayaula.map( ( item ) => { 
        return {
            fkidaula: item.fkidaula, aula: item.aula, estado: item.estado,
            cupo: item.cupo, nota: item.nota,
        };
    } );
};

const loadTurnoDetalle = () => {
    let array = [];
    for (let index = 0; index < 2; index++) {
        array = [ ...array, onDefaultTurno() ];
    }
    return array;
};

const onDefaultTurno = () => {
    return {
        fkidturno: null,
        turno: null,
        estado: "A",
    };
};

const loadAulaDetalle = () => {
    let array = [];
    for (let index = 0; index < 8; index++) {
        array = [ ...array, onDefaultAula() ];
    }
    return array;
};

const onDefaultAula = () => {
    return {
        fkidaula: null, aula: null,
        cupo: 0, nota: "",
        estado: "A",
    };
};
