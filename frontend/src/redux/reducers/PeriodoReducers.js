
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import Periodo from "../models/periodo";

const inititalState = Periodo;

export const PeriodoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.periodo_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.periodo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.periodo_onLimpiar:
            state = Object.assign( {}, Functions.cleanObejct(state) );
            return state;
    
        default:
            return state;
    }
};
