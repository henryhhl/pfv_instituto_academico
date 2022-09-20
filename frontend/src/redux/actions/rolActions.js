
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
        rol.error.descripcion = false;
        rol.message.descripcion = "";
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

export const RolActions = {
    initData,
    onLimpiar,
    setDescripcion,
    setFKIDTipoRol,
    setNota,
    setEstado,
    setISDelete,
};
