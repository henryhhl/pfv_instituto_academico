
import Constants from "../constants/constans";
import { UnidadNegocioService } from "../services/unidadNegocioServices";

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

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.unidadNegocio_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.unidadNegocio_onShow,
    payload: data,
} );

const getAllUnidadNegocio = () => {
    return ( dispatch ) => {
        UnidadNegocioService.getAllUnidadNegocio().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadNegocio',
                    value: result.arrayUnidadNegocio,
                };
                dispatch( onListModule(obj) );
            }
        } ).finally( () => {} );
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

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idunidadnegocio ) => {
    return ( dispatch ) => {
        UnidadNegocioService.onShow( idunidadnegocio ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadNegocio ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadnegocio ) => {
    return ( dispatch ) => {
        UnidadNegocioService.onEdit( idunidadnegocio ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadNegocio ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( unidadNegocio ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadNegocio ) ) {
            dispatch( onChange( unidadNegocio ) );
            return;
        }
        // dispatch( onChangeListModules(unidadNegocio) );
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
    // initData,
    getAllUnidadNegocio,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onEdit,
    onShow,
};
