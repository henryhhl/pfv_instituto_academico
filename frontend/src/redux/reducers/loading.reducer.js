
import Constants from "../constants/constans";

const inititalState = {
    visible: false,
};

export const LoadingReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.setShowLoading:
            state = Object.assign( {}, { ...state, visible: true, } );
            return state;

        case Constants.setHiddenLoading:
            state = Object.assign( {}, { ...state, visible: false, } );
            return state;
    
        default:
            return state;
    }
};
