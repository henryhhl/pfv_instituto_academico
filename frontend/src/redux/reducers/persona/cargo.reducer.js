
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Cargo from "../../models/persona/cargo";

const inititalState = Cargo;

export const CargoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.cargo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.cargo_onCreate:
            onCreate(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.cargo_onShow:
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Constants.cargo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.cargo_onLimpiar:
            Functions.cleanObejct(state)
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

const onSetData = ( state = inititalState, cargo ) => {
    state.idcargo = cargo.idcargo;
    state.descripcion = cargo.descripcion;
    state.concurrencia = cargo.concurrencia;
    state.estado = cargo.estado;
    state.isdelete = cargo.isdelete;
}

const onCreate = ( state = inititalState ) => {
    state.concurrencia = 1;
    state.estado = 'A';
    state.isdelete = 'A';
}
