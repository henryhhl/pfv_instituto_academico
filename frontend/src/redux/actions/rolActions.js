
import Constants from "../constants/constans";

const setInit = () => ( {
    type: Constants.rol_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.rol_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.rol_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setDescripcion = (rol, value) => {
    return ( dispatch ) => {
        rol.descripcion = value;
        rol.error.descripcion = false;
        rol.message.descripcion = "";
        dispatch( onChange(rol) );
    };
};

const setFKIDTipoRol = (rol, tipoRol) => {
    return ( dispatch ) => {
        rol.fkidtiporol = tipoRol.idtiporol;
        rol.tiporol = tipoRol.descripcion;
        rol.error.fkidtiporol = false;
        rol.message.fkidtiporol = "";
        dispatch( onChange(rol) );
    };
};

const setNota = (rol, value) => {
    return ( dispatch ) => {
        rol.nota = value;
        dispatch( onChange(rol) );
    };
};

const setEstado = (rol, value) => {
    return ( dispatch ) => {
        rol.estado = value;
        rol.error.estado = false;
        rol.message.estado = "";
        dispatch( onChange(rol) );
    };
};

const setISDelete = (rol, value) => {
    return ( dispatch ) => {
        rol.isdelete = value;
        rol.error.isdelete = false;
        rol.message.isdelete = "";
        dispatch( onChange(rol) );
    };
};

const onGrabar = ( rol ) => {
    return ( dispatch ) => {
        if ( !onValidate( rol ) ) {
            dispatch( onChange( rol ) );
            return;
        }
        console.log(rol);
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidtiporol.toString().trim().length === 0 ) {
        data.error.fkidtiporol   = true;
        data.message.fkidtiporol = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const RolActions = {
    initData,
    onLimpiar,
    setDescripcion,
    setFKIDTipoRol,
    setNota,
    setEstado,
    setISDelete,
    onGrabar,
};
