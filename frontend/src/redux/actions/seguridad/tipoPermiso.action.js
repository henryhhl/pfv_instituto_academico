
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoPermisoService } from "../../services/seguridad/tipoPermisoServices";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

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

const onPaginateModule = ( data ) => ( {
    type: Constants.paginationModules_onChange,
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

const onPageTipoPermiso = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoPermisoService.getAllTipoPermiso( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoPermiso',
                        value: result.arrayTipoPermiso,
                    },
                    pagination: {
                        name: 'paginationTipoPermiso',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoPermiso',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoPermiso',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const getAllTipoPermiso = () => {
    return ( dispatch ) => {
        TipoPermisoService.getAllTipoPermiso(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoPermiso',
                    value: result.arrayTipoPermiso,
                };
                dispatch( onListModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
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
        TipoPermisoService.onShow( 
            idtipopermiso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoPermiso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipopermiso ) => {
    return ( dispatch ) => {
        TipoPermisoService.onEdit( 
            idtipopermiso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoPermiso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
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
            dispatch( setShowLoading() );
            TipoPermisoService.onStore(
                tipoPermiso
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
            dispatch( setShowLoading() );
            TipoPermisoService.onUpdate(
                tipoPermiso
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
    if ( !bandera ) {
        Swal.fire( {
            position: 'top-end',
            icon: 'warning',
            title: "No se pudo realizar la Funcionalidad",
            text: "Favor llenar los campos requeridos.",
            showConfirmButton: false,
            timer: 3000,
        } );
    }
    return bandera;
};

const onDelete = ( tipoPermiso ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoPermisoService.onDelete(
                tipoPermiso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoPermiso() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Permiso", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoPermisoActions = {
    initData,
    onPageTipoPermiso,
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
