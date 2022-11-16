
import toastr from 'toastr';
import { KeysStorage } from '../../../utils/keysStorage';
import { saveMultiData } from '../../../utils/toolsStorage';
import Constants from "../../constants/constans";
import { AuthService } from '../../services/auth/auth.service';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setLimpiar = () => ( {
    type: Constants.login_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.login_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setLogin = (login, value) => {
    return ( dispatch ) => {
        login.usuario = value;
        login.error.usuario = false;
        login.message.usuario = "";
        dispatch( onChange(login) );
    };
};

const setPassword = (login, value) => {
    return ( dispatch ) => {
        login.password = value;
        login.error.password = false;
        login.message.password = "";
        dispatch( onChange(login) );
    };
};

const onLogin = ( login, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( login ) ) {
            dispatch( onChange( login ) );
            return;
        }
        dispatch( setShowLoading() );
        AuthService.onLogin(login).then( (respta) => {
            if ( respta.resp === 1 ) {
                saveMultiData( 
                    [ KeysStorage.usuario, KeysStorage.token,  ],
                    [ respta.usuario, respta.token, ],
                );
                dispatch( onLimpiar() );
                onBack();
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

function onValidate( data ) {
    if ( data.usuario.toString().trim().length === 0 ) {
        data.error.usuario   = true;
        data.message.usuario = "Campo requerido.";
        toastr.warning( 'Campo Usuario requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.password.toString().trim().length === 0 ) {
        data.error.password   = true;
        data.message.password = "Campo requerido.";
        toastr.warning( 'Campo Contraseña requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    return true;
};

export const LoginActions = {
    onLimpiar,
    setLogin,
    setPassword,
    onLogin,
};
