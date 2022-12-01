
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { EstadoNegocioService } from '../../services/oportunidad/estadonegocio.service';

const setInit = () => ( {
    type: Constants.estadonegocio_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.estadonegocio_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.estadonegocio_onChange,
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
    type: Constants.estadonegocio_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.estadonegocio_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageEstadoNegocio = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        EstadoNegocioService.getAllEstadoNegocio( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listEstadoNegocio',
                        value: result.arrayEstadoNegocio,
                    },
                    pagination: {
                        name: 'paginationEstadoNegocio',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageEstadoNegocio',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateEstadoNegocio',
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

const getAllEstadoNegocio = () => {
    return ( dispatch ) => {
        EstadoNegocioService.getAllEstadoNegocio(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listEstadoNegocio',
                    value: result.arrayEstadoNegocio,
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

const setSigla = (estadoNegocio, value) => {
    return ( dispatch ) => {
        estadoNegocio.sigla = value;
        estadoNegocio.error.sigla = false;
        estadoNegocio.message.sigla = "";
        dispatch( onChange(estadoNegocio) );
    };
};

const setDescripcion = (estadoNegocio, value) => {
    return ( dispatch ) => {
        estadoNegocio.descripcion = value;
        estadoNegocio.error.descripcion = false;
        estadoNegocio.message.descripcion = "";
        dispatch( onChange(estadoNegocio) );
    };
};

const setValorPorcentaje = (estadoNegocio, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( (parseFloat( value ) >= 0 && parseFloat( value ) <= 100) || value === "" ) {
                estadoNegocio.valorporcentaje = (value === "") ? value : parseFloat(value);
                estadoNegocio.error.valorporcentaje = false;
                estadoNegocio.message.valorporcentaje = "";
                dispatch( onChange(estadoNegocio) );
            }
        }
    };
};

const setEstado = (estadoNegocio, value) => {
    return ( dispatch ) => {
        estadoNegocio.estado = value;
        estadoNegocio.error.estado = false;
        estadoNegocio.message.estado = "";
        dispatch( onChange(estadoNegocio) );
    };
};

const setISDelete = (estadoNegocio, value) => {
    return ( dispatch ) => {
        estadoNegocio.isdelete = value;
        estadoNegocio.error.isdelete = false;
        estadoNegocio.message.isdelete = "";
        dispatch( onChange(estadoNegocio) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idestadonegocio ) => {
    return ( dispatch ) => {
        EstadoNegocioService.onShow( 
            idestadonegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.estadoNegocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idestadonegocio ) => {
    return ( dispatch ) => {
        EstadoNegocioService.onEdit( 
            idestadonegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.estadoNegocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( estadoNegocio, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( estadoNegocio ) ) {
            dispatch( onChange( estadoNegocio ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            EstadoNegocioService.onStore(
                estadoNegocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    estadoNegocio.error.descripcion   = true;
                    estadoNegocio.message.descripcion = "Nombre ya existente.";
                    dispatch( onChange(estadoNegocio) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Estado Negocio", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( estadoNegocio, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( estadoNegocio ) ) {
            dispatch( onChange( estadoNegocio ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            EstadoNegocioService.onUpdate(
                estadoNegocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    estadoNegocio.error.descripcion   = true;
                    estadoNegocio.message.descripcion = "Nombre Estado ya existente.";
                    dispatch( onChange(estadoNegocio) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Estado Negocio", onOk: onUpdate,
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
    if ( data.valorporcentaje.toString().trim().length === 0 ) {
        data.error.valorporcentaje   = true;
        data.message.valorporcentaje = "Campo requerido.";
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

const onDelete = ( estadoNegocio ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            EstadoNegocioService.onDelete(
                estadoNegocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageEstadoNegocio() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Estado Negocio", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const EstadoNegocioActions = {
    initData,
    onPageEstadoNegocio,
    getAllEstadoNegocio,
    onLimpiar,
    setSigla,
    setDescripcion,
    setValorPorcentaje,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
