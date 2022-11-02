
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { PermisoService } from "../../services/seguridad/permiso.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setInit = () => ( {
    type: Constants.permiso_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.permiso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.permiso_onChange,
    payload: data,
} );

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = ( fkidpermisopadre = null ) => ( {
    type: Constants.permiso_onCreate,
    payload: fkidpermisopadre,
} );

const setShowData = ( data ) => ( {
    type: Constants.permiso_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllPermiso = () => {
    return ( dispatch ) => {
        PermisoService.getAllPermiso().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listPermiso',
                    value: result.arrayPermiso,
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

const setFkIDPermisoPadre = (permiso, value) => {
    return ( dispatch ) => {
        permiso.fkidpermisopadre = value;
        dispatch( onChange(permiso) );
    };
};

const setFKIDTipoPermiso = (permiso, tipoPermiso) => {
    return ( dispatch ) => {
        permiso.fkidtipopermiso = tipoPermiso.idtipopermiso;
        permiso.tipopermiso = tipoPermiso.descripcion;
        permiso.error.fkidtipopermiso = false;
        permiso.message.fkidtipopermiso = "";
        dispatch( onChange(permiso) );
    };
};

const setDescripcion = (permiso, value) => {
    return ( dispatch ) => {
        permiso.descripcion = value;
        permiso.error.descripcion = false;
        permiso.message.descripcion = "";
        dispatch( onChange(permiso) );
    };
};

const setEstado = (permiso, value) => {
    return ( dispatch ) => {
        permiso.estado = value;
        permiso.error.estado = false;
        permiso.message.estado = "";
        dispatch( onChange(permiso) );
    };
};

const setISDelete = (permiso, value) => {
    return ( dispatch ) => {
        permiso.isdelete = value;
        permiso.error.isdelete = false;
        permiso.message.isdelete = "";
        dispatch( onChange(permiso) );
    };
};

const onCreate = ( fkidpermisopadre = null ) => {
    return ( dispatch ) => {
        dispatch( setCreate(fkidpermisopadre) );
    };
};

const onShow = ( idpermiso ) => {
    return ( dispatch ) => {
        PermisoService.onShow( idpermiso ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.permiso ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idpermiso ) => {
    return ( dispatch ) => {
        PermisoService.onEdit( idpermiso ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.permiso ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( permiso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( permiso ) ) {
            dispatch( onChange( permiso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            PermisoService.onStore(permiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllPermiso() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Permiso", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( permiso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( permiso ) ) {
            dispatch( onChange( permiso ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            PermisoService.onUpdate(permiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllPermiso() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Permiso", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidtipopermiso.toString().trim().length === 0 ) {
        data.error.fkidtipopermiso   = true;
        data.message.fkidtipopermiso = "Campo requerido.";
        bandera = false;
    }
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

const onDelete = ( permiso ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            PermisoService.onDelete(permiso).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllPermiso() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Permiso", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const PermisoActions = {
    initData,
    getAllPermiso,
    onLimpiar,
    setFKIDTipoPermiso,
    setFkIDPermisoPadre,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onShow,
    onEdit,
    onGrabar,
    onUpdate,
    onDelete,
};
