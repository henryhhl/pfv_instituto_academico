
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { ResponsableService } from "../../services/estructuraacademica/responsable.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from "../common/sesion.action";

const setInit = () => ( {
    type: Constants.responsable_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.responsable_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.responsable_onChange,
    payload: data,
} );

const onAddReferenciaContacto = ( ) => ( {
    type: Constants.responsable_onAddRefContact,
} );

const onDeleteRowReferenciaContacto = ( index ) => ( {
    type: Constants.responsable_onDeleteRowRefContact,
    payload: index,
} );

const onAddUnidadAcademica = ( ) => ( {
    type: Constants.responsable_onAddUndAcademica,
} );

const onDeleteRowUnidadAcademica = ( index ) => ( {
    type: Constants.responsable_onDeleteRowUndAcademica,
    payload: index,
} );

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.responsable_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.responsable_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllResponsable = () => {
    return ( dispatch ) => {
        ResponsableService.getAllResponsable(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listResponsable',
                    value: result.arrayResponsable,
                };
                dispatch( onListModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setCodigo = (responsable, value) => {
    return ( dispatch ) => {
        responsable.codigo = value;
        responsable.error.codigo = false;
        responsable.message.codigo = "";
        dispatch( onChange(responsable) );
    };
};

const setNroDocumento = (responsable, value) => {
    return ( dispatch ) => {
        responsable.nrodocumento = value;
        responsable.error.nrodocumento = false;
        responsable.message.nrodocumento = "";
        dispatch( onChange(responsable) );
    };
};

const setNombre = (responsable, value) => {
    return ( dispatch ) => {
        responsable.nombre = value;
        responsable.error.nombre = false;
        responsable.message.nombre = "";
        dispatch( onChange(responsable) );
    };
};

const setApellido = (responsable, value) => {
    return ( dispatch ) => {
        responsable.apellido = value;
        responsable.error.apellido = false;
        responsable.message.apellido = "";
        dispatch( onChange(responsable) );
    };
};

const setCiudad = (responsable, value) => {
    return ( dispatch ) => {
        responsable.ciudad = value;
        responsable.error.ciudad = false;
        responsable.message.ciudad = "";
        dispatch( onChange(responsable) );
    };
};

const setDireccion = (responsable, value) => {
    return ( dispatch ) => {
        responsable.direccion = value;
        responsable.error.direccion = false;
        responsable.message.direccion = "";
        dispatch( onChange(responsable) );
    };
};

const setGenero = (responsable, value) => {
    return ( dispatch ) => {
        responsable.genero = value;
        responsable.error.genero = false;
        responsable.message.genero = "";
        dispatch( onChange(responsable) );
    };
};

const setFechaNacimiento = (responsable, value) => {
    return ( dispatch ) => {
        responsable.fechanacimiento = value;
        responsable.error.fechanacimiento = false;
        responsable.message.fechanacimiento = "";
        dispatch( onChange(responsable) );
    };
};

const setEstado = (responsable, value) => {
    return ( dispatch ) => {
        responsable.estado = value;
        responsable.error.estado = false;
        responsable.message.estado = "";
        dispatch( onChange(responsable) );
    };
};

const setISDelete = (responsable, value) => {
    return ( dispatch ) => {
        responsable.isdelete = value;
        responsable.error.isdelete = false;
        responsable.message.isdelete = "";
        dispatch( onChange(responsable) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idresponsable ) => {
    return ( dispatch ) => {
        ResponsableService.onShow( 
            idresponsable 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.responsable ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idresponsable ) => {
    return ( dispatch ) => {
        ResponsableService.onEdit( 
            idresponsable 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.responsable ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( responsable, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( responsable ) ) {
            dispatch( onChange( responsable ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ResponsableService.onStore(
                responsable
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Responsable", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( responsable, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( responsable ) ) {
            dispatch( onChange( responsable ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ResponsableService.onUpdate(
                responsable
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Responsable", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.codigo.toString().trim().length === 0 ) {
        data.error.codigo   = true;
        data.message.codigo = "Campo requerido.";
        bandera = false;
    }
    if ( data.nrodocumento.toString().trim().length === 0 ) {
        data.error.nrodocumento   = true;
        data.message.nrodocumento = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombre.toString().trim().length === 0 ) {
        data.error.nombre   = true;
        data.message.nombre = "Campo requerido.";
        bandera = false;
    }
    if ( data.apellido.toString().trim().length === 0 ) {
        data.error.apellido   = true;
        data.message.apellido = "Campo requerido.";
        bandera = false;
    }
    if ( data.ciudad.toString().trim().length === 0 ) {
        data.error.ciudad   = true;
        data.message.ciudad = "Campo requerido.";
        bandera = false;
    }
    if ( data.direccion.toString().trim().length === 0 ) {
        data.error.direccion   = true;
        data.message.direccion = "Campo requerido.";
        bandera = false;
    }
    if ( data.genero.toString().trim().length === 0 ) {
        data.error.genero   = true;
        data.message.genero = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechanacimiento.toString().trim().length === 0 ) {
        data.error.fechanacimiento   = true;
        data.message.fechanacimiento = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( responsable ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ResponsableService.onDelete(
                responsable
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllResponsable() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Responsable", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ResponsableActions = {
    initData,
    onAddReferenciaContacto,
    onDeleteRowReferenciaContacto,
    onAddUnidadAcademica,
    onDeleteRowUnidadAcademica,
    onChange,
    getAllResponsable,
    onLimpiar,
    setCodigo,
    setNroDocumento,
    setNombre,
    setApellido,
    setCiudad,
    setDireccion,
    setGenero,
    setFechaNacimiento,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
