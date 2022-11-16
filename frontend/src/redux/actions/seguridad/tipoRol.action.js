
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { TipoRolService } from "../../services/seguridad/tipoRolServices";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

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

const onPaginateModule = ( data ) => ( {
    type: Constants.paginationModules_onChange,
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

const onPageTipoRol = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoRolService.getAllTipoRol( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoRol',
                        value: result.arrayTipoRol,
                    },
                    pagination: {
                        name: 'paginationTipoRol',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoRol',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoRol',
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

const getAllTipoRol = () => {
    return ( dispatch ) => {
        TipoRolService.getAllTipoRol(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoRol',
                    value: result.arrayTipoRol,
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
        TipoRolService.onShow( 
            idtiporol 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoRol ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtiporol ) => {
    return ( dispatch ) => {
        TipoRolService.onEdit( 
            idtiporol 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoRol ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
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
            dispatch( setShowLoading() );
            TipoRolService.onStore(
                tipoRol
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
            dispatch( setShowLoading() );
            TipoRolService.onUpdate(
                tipoRol
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

const onDelete = ( tipoRol ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoRolService.onDelete(
                tipoRol
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoRol() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Rol", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoRolActions = {
    initData,
    onPageTipoRol,
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
