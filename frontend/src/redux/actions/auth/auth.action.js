
import ConfirmationComponent from '../../../components/confirmation';
import { KeysStorage } from '../../../utils/keysStorage';
import { removeAllData, saveData } from '../../../utils/toolsStorage';
import Constants from '../../constants/constans';
import { AuthService } from '../../services/auth/auth.service';
import { setHiddenLoading, setShowLoading } from '../common/loading.action';
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setLimpiar = () => ( {
    type: Constants.profile_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.profile_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.profile_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.profile_onShow,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const onValidateToken = ( onBack ) => {
    return async ( dispatch ) => {
        return await AuthService.onValidateToken().then( (respta) => {
            if ( respta.resp === 1 ) {
                saveData( KeysStorage.usuario, respta.usuario );
                saveData( KeysStorage.token, respta.token );
                dispatch( setShowData( respta.usuario ) );
                return respta;
            } else if ( respta.resp === -2 ) {
                removeAllData();
                onBack();
            }
            return null;
        } ).finally( () => {
            // dispatch( setHiddenLoading() );
        } );
    };
};

const updateProfile = ( profile, onFunction = () => {} ) => {
    return ( dispatch ) => {
        let onUpdateProfile = () => {
            dispatch( setShowLoading() );
            AuthService.updateProfile(
                profile
            ).then( async (respta) => {
                if ( respta.resp === 1 ) {
                    dispatch( setShowData( respta.usuario ) );
                    onFunction();
                } else if ( respta.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Perfil", onOk: onUpdateProfile,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

export const AuthActions = {
    onLimpiar,
    onValidateToken,
    updateProfile,
};
