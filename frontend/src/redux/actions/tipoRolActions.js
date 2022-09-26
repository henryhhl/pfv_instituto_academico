
import Constants from "../constants/constans";
import { TipoRolService } from "../services/tipoRolServices";

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

const getAllTipoRol = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllTipoRol().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
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

const onGrabar = ( tipoRol ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoRol ) ) {
            dispatch( onChange( tipoRol ) );
            return;
        }
        console.log(tipoRol);
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const TipoRolActions = {
    initData,
    getAllTipoRol,
    onLimpiar,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
