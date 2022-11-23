
import { KeysStorage } from '../../../utils/keysStorage';
import { saveData } from '../../../utils/toolsStorage';
import { AuthService } from '../../services/auth/auth.service';

const onValidateToken = ( onBack ) => {
    return async ( dispatch ) => {
        return await AuthService.onValidateToken().then( (respta) => {
            if ( respta.resp === 1 ) {
                saveData( KeysStorage.usuario, respta.usuario );
                saveData( KeysStorage.token, respta.token );
                return respta;
            } else if ( respta.resp === -2 ) {
                onBack();
            }
            return null;
        } ).finally( () => {
            // dispatch( setHiddenLoading() );
        } );
    };
};

export const AuthActions = {
    onValidateToken,
};
