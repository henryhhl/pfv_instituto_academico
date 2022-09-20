
import Constants from "../constants/constans";

const setInit = () => ( {
    type: Constants.tipoRol_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipoRol_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipoRol_onChange,
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

const setDescripcion = (tipoRol, value) => {
    return ( dispatch ) => {
        tipoRol.descripcion = value;
        tipoRol.error.descripcion = false;
        tipoRol.message.descripcion = "";
        dispatch( onChange(tipoRol) );
    };
};

const setEstado = (tipoRol, value) => {
    return ( dispatch ) => {
        tipoRol.estado = value;
        tipoRol.error.estado = false;
        tipoRol.message.estado = "";
        dispatch( onChange(tipoRol) );
    };
};

const setISDelete = (tipoRol, value) => {
    return ( dispatch ) => {
        tipoRol.isdelete = value;
        tipoRol.error.isdelete = false;
        tipoRol.message.isdelete = "";
        dispatch( onChange(tipoRol) );
    };
};

export const TipoRolActions = {
    initData,
    onLimpiar,
    setDescripcion,
    setEstado,
    setISDelete,
};
