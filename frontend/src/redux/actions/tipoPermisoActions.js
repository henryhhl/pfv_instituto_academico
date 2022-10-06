
import ConfirmationComponent from "../../components/confirmation";
import Constants from "../constants/constans";
import { TipoPermisoService } from "../services/tipoPermisoServices";

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

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.tipoPermiso_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipoPermiso_onShow,
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

const getAllTipoPermiso = () => {
    return ( dispatch ) => {
        TipoPermisoService.getAllTipoPermiso().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoPermiso',
                    value: result.arrayTipoPermiso,
                };
                dispatch( onListModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipopermiso ) => {
    return ( dispatch ) => {
        TipoPermisoService.onShow( idtipopermiso ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoPermiso ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipopermiso ) => {
    return ( dispatch ) => {
        TipoPermisoService.onEdit( idtipopermiso ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoPermiso ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoPermiso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoPermiso ) ) {
            dispatch( onChange( tipoPermiso ) );
            return;
        }
        let onStore = () => {
            TipoPermisoService.onStore(tipoPermiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Permiso", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoPermiso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoPermiso ) ) {
            dispatch( onChange( tipoPermiso ) );
            return;
        }
        let onUpdate = () => {
            TipoPermisoService.onUpdate(tipoPermiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Permiso", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( tipoPermiso ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            TipoPermisoService.onDelete(tipoPermiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllTipoPermiso() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Permiso", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoPermisoActions = {
    initData,
    getAllTipoPermiso,
    onLimpiar,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onEdit,
    onShow,
    onUpdate,
    onDelete,
};
