
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.unidadNegocio_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.unidadNegocio_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.unidadNegocio_onChange,
    payload: data,
} );

const onChangeListModules = ( obj ) => ( {
    type: Constants.listModules_onChange,
    payload: { name: 'listUnidadNegocio', value: obj, },
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllUnidadNegocio = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllUnidadNegocio().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (unidadNegocio, value) => {
    return ( dispatch ) => {
        unidadNegocio.sigla = value;
        unidadNegocio.error.sigla = false;
        unidadNegocio.message.sigla = "";
        dispatch( onChange(unidadNegocio) );
    };
};

const setDescripcion = (unidadNegocio, value) => {
    return ( dispatch ) => {
        unidadNegocio.descripcion = value;
        unidadNegocio.error.descripcion = false;
        unidadNegocio.message.descripcion = "";
        dispatch( onChange(unidadNegocio) );
    };
};

const setEstado = (unidadNegocio, value) => {
    return ( dispatch ) => {
        unidadNegocio.estado = value;
        unidadNegocio.error.estado = false;
        unidadNegocio.message.estado = "";
        dispatch( onChange(unidadNegocio) );
    };
};

const setISDelete = (unidadNegocio, value) => {
    return ( dispatch ) => {
        unidadNegocio.isdelete = value;
        unidadNegocio.error.isdelete = false;
        unidadNegocio.message.isdelete = "";
        dispatch( onChange(unidadNegocio) );
    };
};

const onGrabar = ( unidadNegocio ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadNegocio ) ) {
            dispatch( onChange( unidadNegocio ) );
            return;
        }
        dispatch( onChangeListModules(unidadNegocio) );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.sigla.toString().trim().length === 0 ) {
        data.error.sigla   = true;
        data.message.sigla = "Campo requerido.";
        bandera = false;
    }
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const UnidadNegocioActions = {
    initData,
    getAllUnidadNegocio,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
