
import Constants from "../constants/constans";
import PaginationModule from "../models/paginationModule";

const inititalState = PaginationModule;

export const PaginationModuleReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.paginationModules_onChange:
            const { data, page, paginate, pagination } = action.payload;
            state[data.name] = [...data.value];
            state[pagination.name] = { ...pagination.value };
            state[page.name] = page.value;
            state[paginate.name] = paginate.value;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
