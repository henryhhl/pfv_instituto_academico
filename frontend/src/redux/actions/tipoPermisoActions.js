
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.tipoPermiso_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipoPermiso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipoPermiso_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllTipoPermiso = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllTipoPermiso().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setDescripcion = (tipoPermiso, value) => {
    return ( dispatch ) => {
        tipoPermiso.descripcion = value;
        tipoPermiso.error.descripcion = false;
        tipoPermiso.message.descripcion = "";
        dispatch( onChange(tipoPermiso) );
    };
};

const setEstado = (tipoPermiso, value) => {
    return ( dispatch ) => {
        tipoPermiso.estado = value;
        tipoPermiso.error.estado = false;
        tipoPermiso.message.estado = "";
        dispatch( onChange(tipoPermiso) );
    };
};

const setISDelete = (tipoPermiso, value) => {
    return ( dispatch ) => {
        tipoPermiso.isdelete = value;
        tipoPermiso.error.isdelete = false;
        tipoPermiso.message.isdelete = "";
        dispatch( onChange(tipoPermiso) );
    };
};

const onGrabar = ( tipoPermiso ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoPermiso ) ) {
            dispatch( onChange( tipoPermiso ) );
            return;
        }
        console.log(tipoPermiso);
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

export const TipoPermisoActions = {
    initData,
    getAllTipoPermiso,
    onLimpiar,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
