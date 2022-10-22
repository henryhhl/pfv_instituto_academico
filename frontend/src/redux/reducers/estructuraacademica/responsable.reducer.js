
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Responsable from "../../models/estructuraacademica/responsable";

const inititalState = Responsable;

export const ResponsableReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.responsable_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.responsable_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onAddRefContact:
            let arrayRefContacto = state.arrayResponsableReferenciaContactoDetalle;
            state.arrayResponsableReferenciaContactoDetalle = [ ...arrayRefContacto, onDefaultReferenciaContacto() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onDeleteRowRefContact:
            state.arrayResponsableReferenciaContactoDetalle = state.arrayResponsableReferenciaContactoDetalle.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onAddUndAcademica:
            let array = state.arrayResponsableUnidadAcademicaDetalle;
            state.arrayResponsableUnidadAcademicaDetalle = [ ...array, onDefaultUnidadAcademica() ];
            state = Object.assign( {}, state );
            return state;

        case Constants.responsable_onDeleteRowUndAcademica:
            state.arrayResponsableUnidadAcademicaDetalle = state.arrayResponsableUnidadAcademicaDetalle.filter( 
                (item, index) => action.payload !== index 
            );
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    };
};

const onCreate = ( state = inititalState ) => {
    state.arrayResponsableReferenciaContactoDetalle = loadReferenciaContactoDetalle();
    state.arrayResponsableUnidadAcademicaDetalle = loadUnidadAcademicaDetalle();
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
};

const onSetData = ( state = inititalState, responsable ) => {
    state.idresponsable = responsable.idresponsable;
    state.codigo = responsable.codigo;
    state.nrodocumento = responsable.nrodocumento;
    state.nombre = responsable.nombre;
    state.apellido = responsable.apellido;
    state.ciudad = responsable.ciudad;
    state.direccion = responsable.direccion;
    state.genero = responsable.genero;
    state.fechanacimiento = responsable.fechanacimiento;
    state.concurrencia = responsable.concurrencia;
    state.estado = responsable.estado;
    state.isdelete = responsable.isdelete;
}

const loadUnidadAcademicaDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultUnidadAcademica() ];
    }
    return array;
};

const onDefaultUnidadAcademica = () => {
    return {
        fkiddunidadacademica: "",
        unidadacademica: "",

        fkidunidadadministrativa: "",
        unidadadministrativa: "",

        fkidunidadnegocio: "",
        unidadnegocio: "",
    };
};

const loadReferenciaContactoDetalle = () => {
    let array = [];
    for (let index = 0; index < 3; index++) {
        array = [ ...array, onDefaultReferenciaContacto() ];
    }
    return array;
};

const onDefaultReferenciaContacto = () => {
    return {
        fkidreferenciacontacto: "",
        referenciacontacto: "",
        detalle: "",
        disabled: true,
    };
};
