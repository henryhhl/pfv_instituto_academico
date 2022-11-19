
import toastr from 'toastr';
import { Functions } from '../../../utils/functions';
import { KeysStorage } from '../../../utils/keysStorage';
import { saveMultiData } from '../../../utils/toolsStorage';
import Constants from "../../constants/constans";
import { AuthService } from '../../services/auth/auth.service';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setLimpiar = () => ( {
    type: Constants.register_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.register_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setEmail = (register, value) => {
    return ( dispatch ) => {
        register.email = value;
        register.error.email = false;
        register.message.email = "";
        dispatch( onChange(register) );
    };
};

const setLogin = (register, value) => {
    return ( dispatch ) => {
        register.usuario = value;
        register.error.usuario = false;
        register.message.usuario = "";
        dispatch( onChange(register) );
    };
};

const setPassword = (register, value) => {
    return ( dispatch ) => {
        register.password = value;
        register.error.password = false;
        register.message.password = "";
        dispatch( onChange(register) );
    };
};

const onRegister = ( register, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( register ) ) {
            dispatch( onChange( register ) );
            return;
        }
        dispatch( setShowLoading() );
        AuthService.onRegister(register).then( (respta) => {
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
    if ( data.email.toString().trim().length === 0 ) {
        data.error.email   = true;
        data.message.email = "Campo requerido.";
        toastr.warning( 'Campo Email requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( !Functions.validateEmail( data.email ) ) {
        data.error.email   = true;
        data.message.email = "Es requerido de tipo Email.";
        toastr.warning( 'Campo Email requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.email.toString().indexOf(' ') > -1 ) {
        data.error.email   = true;
        data.message.email = "No debe contener espacios.";
        toastr.warning( 'Campo Email requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.usuario.toString().trim().length === 0 ) {
        data.error.usuario   = true;
        data.message.usuario = "Campo requerido.";
        toastr.warning( 'Campo Usuario requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.usuario.toString().trim().length < 4 ) {
        data.error.usuario   = true;
        data.message.usuario = "Campo debe ser mayor o igual a 4 carácter.";
        toastr.warning( 'Campo Usuario requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.usuario.toString().trim().indexOf(' ') > -1 ) {
        data.error.usuario   = true;
        data.message.usuario = "No debe contener espacios.";
        toastr.warning( 'Campo Usuario requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.password.toString().length === 0 ) {
        data.error.password   = true;
        data.message.password = "Campo requerido.";
        toastr.warning( 'Campo Contraseña requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.password.toString().length < 6 ) {
        data.error.password   = true;
        data.message.password = "Campo debe ser mayor o igual a 6 carácter.";
        toastr.warning( 'Campo Contraseña requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( !Functions.validatePassword( data.password ) ) {
        data.error.password   = true;
        data.message.password = "Campo debe tener una letra mayúscula, minúscula y un número.";
        toastr.warning( 'Campo Contraseña requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    if ( data.password.toString().indexOf(' ') > -1 ) {
        data.error.password   = true;
        data.message.password = "No debe contener espacios.";
        toastr.warning( 'Campo Contraseña requerido.', 'Advertencia', { closeButton: true, progressBar: true, } );
        return false;
    }
    return true;
};

export const RegisterActions = {
    onLimpiar,
    setEmail,
    setLogin,
    setPassword,
    onRegister,
};
