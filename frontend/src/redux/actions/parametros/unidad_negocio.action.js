
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { UnidadNegocioService } from "../../services/parametros/unidad_negocioServices";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

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

const onPaginateModule = ( data ) => ( {
    type: Constants.paginationModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.unidadNegocio_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.unidadNegocio_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageUnidadNegocio = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        UnidadNegocioService.getAllUnidadNegocio( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listUnidadNegocio',
                        value: result.arrayUnidadNegocio,
                    },
                    pagination: {
                        name: 'paginationUnidadNegocio',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageUnidadNegocio',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateUnidadNegocio',
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

const getAllUnidadNegocio = () => {
    return ( dispatch ) => {
        UnidadNegocioService.getAllUnidadNegocio(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadNegocio',
                    value: result.arrayUnidadNegocio,
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
        UnidadNegocioService.onShow( 
            idunidadnegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadNegocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadnegocio ) => {
    return ( dispatch ) => {
        UnidadNegocioService.onEdit( 
            idunidadnegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadNegocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( unidadNegocio, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadNegocio ) ) {
            dispatch( onChange( unidadNegocio ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            UnidadNegocioService.onStore(
                unidadNegocio
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
            title: "Registrar Unidad Negocio", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( unidadNegocio, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadNegocio ) ) {
            dispatch( onChange( unidadNegocio ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            UnidadNegocioService.onUpdate(
                unidadNegocio
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
            title: "Editar Unidad Negocio", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
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

const onDelete = ( unidadNegocio ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            UnidadNegocioService.onDelete(
                unidadNegocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageUnidadNegocio() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Unidad Negocio", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UnidadNegocioActions = {
    initData,
    onPageUnidadNegocio,
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
    onUpdate,
    onDelete,
};
