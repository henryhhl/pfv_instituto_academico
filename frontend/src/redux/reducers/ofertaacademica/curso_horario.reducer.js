
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import CursoHorario from "../../models/ofertaacademica/horario_curso";

const inititalState = CursoHorario;

export const CursoHorarioReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {

        case Constants.cursohorario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.cursohorario_onLimpiar:
            Functions.cleanObejct(state);
            state.arraydias = onDefaultDays();
            state = Object.assign( {}, state );
            return state;

        case Constants.cursohorario_onAddRowHorario:
            let arrayHorario = state.arrayhorario;
            state.arrayhorario = [ ...arrayHorario, onDefaultHorario( action.payload ) ];

            state.arraydias = state.arraydias.map( ( item, index ) => {
                item.arrayhorario = [ ...item.arrayhorario, {
                    fkidaula: null, aula: null,
                    arraydocente: state.arraydocente,
                    fkiddocente: (state.arraydocente.length > 0) ? null : state.arraydocente[0].fkiddocente, 
                    docente: (state.arraydocente.length > 0) ? null : state.arraydocente[0].docente,
                    isdisableddocente: (state.arraydocente.length > 1) ? false : true,
                } ];
                return item;
            } );

            state = Object.assign( {}, state );
            return state;

        case Constants.cursohorario_onDeleteRowHorario:
            state.arrayhorario = state.arrayhorario.filter( 
                (item, index) => action.payload !== index 
            );

            state.arraydias = state.arraydias.map( ( item ) => {
                item.arrayhorario = item.arrayhorario.filter( 
                    (items, index) => action.payload !== index 
                );
                return item;
            } );

            state = Object.assign( {}, state );
            return state;
        
        default:
            return state;
    }
};

const onDefaultHorario = ( data ) => {
    return {
        horainicio: data.horainicio,
        horafinal: data.horafinal,
        estado: "A",
    };
};

const onDefaultDays = () => {
    return [1, 2, 3, 4, 5, 6, 7].map( (item) => {
        switch (item) {
            case 1:
                return {
                    codigo: 'lu', descripcion: 'Lunes', arrayhorario: [],
                };
            case 2:
                return {
                    codigo: 'ma', descripcion: 'Martes', arrayhorario: [],
                };
            case 3:
                return {
                    codigo: 'mi', descripcion: 'Miércoles', arrayhorario: [],
                };
            case 4:
                return {
                    codigo: 'ju', descripcion: 'Jueves', arrayhorario: [],
                };
            case 5:
                return {
                    codigo: 'vi', descripcion: 'Viernes', arrayhorario: [],
                };
            case 6:
                return {
                    codigo: 'sá', descripcion: 'Sábado', arrayhorario: [],
                };
            default:
                return {
                    codigo: 'do', descripcion: 'Domingo', arrayhorario: [],
                };
        }
    } );
};