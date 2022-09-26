
import Constants from "../constants/constans";

const setInit = () => ( {
    type: Constants.usuario_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.usuario_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.usuario_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllUsuario = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllUsuario().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setEmail = (usuario, value) => {
    return ( dispatch ) => {
        usuario.email = value;
        usuario.error.email = false;
        usuario.message.email = "";
        dispatch( onChange(usuario) );
    };
};

const setLogin = (usuario, value) => {
    return ( dispatch ) => {
        usuario.login = value;
        usuario.error.login = false;
        usuario.message.login = "";
        dispatch( onChange(usuario) );
    };
};

const setPassword = (usuario, value) => {
    return ( dispatch ) => {
        usuario.password = value;
        usuario.error.password = false;
        usuario.message.password = "";
        dispatch( onChange(usuario) );
    };
};

const setEstado = (usuario, value) => {
    return ( dispatch ) => {
        usuario.estado = value;
        usuario.error.estado = false;
        usuario.message.estado = "";
        dispatch( onChange(usuario) );
    };
};

const setISDelete = (usuario, value) => {
    return ( dispatch ) => {
        usuario.isdelete = value;
        usuario.error.isdelete = false;
        usuario.message.isdelete = "";
        dispatch( onChange(usuario) );
    };
};

const onGrabar = ( usuario ) => {
    return ( dispatch ) => {
        if ( !onValidate( usuario ) ) {
            dispatch( onChange( usuario ) );
            return;
        }
        console.log(usuario);
    };
};

function onValidate( data ) {
    let bandera = true;
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(data.email)) {
        data.error.email   = true;
        data.message.email = "Email requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length === 0 ) {
        data.error.email   = true;
        data.message.email = "Campo requerido.";
        bandera = false;
    }
    if ( data.login.toString().trim().length === 0 ) {
        data.error.login   = true;
        data.message.login = "Campo requerido.";
        bandera = false;
    }
    if ( data.password.toString().trim().length === 0 ) {
        data.error.password   = true;
        data.message.password = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const UsuarioActions = {
    initData,
    getAllUsuario,
    onLimpiar,
    setEmail,
    setLogin,
    setPassword,
    setEstado,
    setISDelete,
    onGrabar,
};
