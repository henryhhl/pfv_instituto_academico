
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import ColumnModules from "../models/columnModule";

const inititalState = ColumnModules;

export const ColumnModuleReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case 'Modules':
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
