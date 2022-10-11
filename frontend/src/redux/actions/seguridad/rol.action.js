
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { RolService } from "../../services/seguridad/rolServices";

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

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.rol_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.rol_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllRol = () => {
    return ( dispatch ) => {
        RolService.getAllRol().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listRol',
                    value: result.arrayRol,
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

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idrol ) => {
    return ( dispatch ) => {
        RolService.onShow( idrol ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.rol ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idrol ) => {
    return ( dispatch ) => {
        RolService.onEdit( idrol ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.rol ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( rol, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( rol ) ) {
            dispatch( onChange( rol ) );
            return;
        }
        let onStore = () => {
            RolService.onStore(rol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Rol", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( rol, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( rol ) ) {
            dispatch( onChange( rol ) );
            return;
        }
        let onUpdate = () => {
            RolService.onUpdate(rol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Rol", onOk: onUpdate,
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
    if ( data.fkidtiporol.toString().trim().length === 0 ) {
        data.error.fkidtiporol   = true;
        data.message.fkidtiporol = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( rol ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            RolService.onDelete(rol).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllRol() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Rol", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const RolActions = {
    initData,
    getAllRol,
    onLimpiar,
    setDescripcion,
    setFKIDTipoRol,
    setNota,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
