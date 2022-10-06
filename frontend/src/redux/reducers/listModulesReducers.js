
import Constants from "../constants/constans";
import { Functions } from "../../utils/functions";
import ListModules from "../models/listModule";

const inititalState = ListModules;

export const ListModuleReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.listModules_onChange:
            state[action.payload.name] = [...action.payload.value];
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
