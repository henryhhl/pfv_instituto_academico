
import ConfirmationComponent from "../../components/confirmation";
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

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.tipoRol_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipoRol_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllTipoRol = () => {
    return ( dispatch ) => {
        TipoRolService.getAllTipoRol().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoRol',
                    value: result.arrayTipoRol,
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

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtiporol ) => {
    return ( dispatch ) => {
        TipoRolService.onShow( idtiporol ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoRol ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtiporol ) => {
    return ( dispatch ) => {
        TipoRolService.onEdit( idtiporol ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoRol ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoRol, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoRol ) ) {
            dispatch( onChange( tipoRol ) );
            return;
        }
        let onStore = () => {
            TipoRolService.onStore(tipoRol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Rol", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoRol, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoRol ) ) {
            dispatch( onChange( tipoRol ) );
            return;
        }
        let onUpdate = () => {
            TipoRolService.onUpdate(tipoRol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Rol", onOk: onUpdate,
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

const onDelete = ( tipoRol ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            TipoRolService.onDelete(tipoRol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllTipoRol() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Rol", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoRolActions = {
    initData,
    getAllTipoRol,
    onLimpiar,
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
