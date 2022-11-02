
import Constants from "../../constants/constans";

export const setShowLoading = ( ) => ( {
    type: Constants.setShowLoading,
} );

export const setHiddenLoading = ( ) => ( {
    type: Constants.setHiddenLoading,
} );

export const LoadingAction = {
    setShowLoading,
    setHiddenLoading,
};
