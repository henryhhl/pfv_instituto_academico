
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { ParametroCalificacionService } from '../../services/nota/parametrocalificacion.service';

const setInit = () => ( {
    type: Constants.parametrocalificacion_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.parametrocalificacion_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.parametrocalificacion_onChange,
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
    type: Constants.parametrocalificacion_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.parametrocalificacion_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPage = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.getAll( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listParametroCalificacion',
                        value: result.arrayParametroCalificacion,
                    },
                    pagination: {
                        name: 'paginationParametroCalificacion',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageParametroCalificacion',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateParametroCalificacion',
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

const getAll = () => {
    return ( dispatch ) => {
        ParametroCalificacionService.getAll(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listParametroCalificacion',
                    value: result.arrayParametroCalificacion,
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

const setSigla = (parametroCalificacion, value) => {
    return ( dispatch ) => {
        parametroCalificacion.sigla = value;
        parametroCalificacion.error.sigla = false;
        parametroCalificacion.message.sigla = "";
        dispatch( onChange(parametroCalificacion) );
    };
};

const setDescripcion = (parametroCalificacion, value) => {
    return ( dispatch ) => {
        parametroCalificacion.descripcion = value;
        parametroCalificacion.error.descripcion = false;
        parametroCalificacion.message.descripcion = "";
        dispatch( onChange(parametroCalificacion) );
    };
};

const setValorPorcentaje = (parametroCalificacion, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( (parseFloat( value ) >= 0 && parseFloat( value ) <= 100) || value === "" ) {
                parametroCalificacion.valorporcentaje = (value === "") ? value : parseFloat(value);
                parametroCalificacion.error.valorporcentaje = false;
                parametroCalificacion.message.valorporcentaje = "";
                dispatch( onChange(parametroCalificacion) );
            }
        }
    };
};

const setEstado = (parametroCalificacion, value) => {
    return ( dispatch ) => {
        parametroCalificacion.estado = value;
        parametroCalificacion.error.estado = false;
        parametroCalificacion.message.estado = "";
        dispatch( onChange(parametroCalificacion) );
    };
};

const setISDelete = (parametroCalificacion, value) => {
    return ( dispatch ) => {
        parametroCalificacion.isdelete = value;
        parametroCalificacion.error.isdelete = false;
        parametroCalificacion.message.isdelete = "";
        dispatch( onChange(parametroCalificacion) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idparametrocalificacion ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.onShow( 
            idparametrocalificacion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.parametroCalificacion ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idparametrocalificacion ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.onEdit( 
            idparametrocalificacion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.parametroCalificacion ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( parametroCalificacion, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( parametroCalificacion ) ) {
            dispatch( onChange( parametroCalificacion ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ParametroCalificacionService.onStore(
                parametroCalificacion
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
            title: "Registrar Parametro Calificación", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( parametroCalificacion, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( parametroCalificacion ) ) {
            dispatch( onChange( parametroCalificacion ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ParametroCalificacionService.onUpdate(
                parametroCalificacion
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
            title: "Editar Parametro Calificación", onOk: onUpdate,
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

const onDelete = ( parametroCalificacion ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ParametroCalificacionService.onDelete(
                parametroCalificacion
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPage() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Parametro Calificación", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ParametroCalificacionActions = {
    initData,
    onPage,
    getAll,
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
