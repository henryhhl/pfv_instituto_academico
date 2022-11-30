
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoActividadService } from '../../services/oportunidad/tipoactividad.service';

const setInit = () => ( {
    type: Constants.tipoactividad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipoactividad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipoactividad_onChange,
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
    type: Constants.tipoactividad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipoactividad_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoActividad = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoActividadService.getAllTipoActividad( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoActividad',
                        value: result.arrayTipoActividad,
                    },
                    pagination: {
                        name: 'paginationTipoActividad',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoActividad',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoActividad',
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

const getAllTipoActividad = () => {
    return ( dispatch ) => {
        TipoActividadService.getAllTipoActividad(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoActividad',
                    value: result.arrayTipoActividad,
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

const setSigla = (tipoActividad, value) => {
    return ( dispatch ) => {
        tipoActividad.sigla = value;
        tipoActividad.error.sigla = false;
        tipoActividad.message.sigla = "";
        dispatch( onChange(tipoActividad) );
    };
};

const setDescripcion = (tipoActividad, value) => {
    return ( dispatch ) => {
        tipoActividad.descripcion = value;
        tipoActividad.error.descripcion = false;
        tipoActividad.message.descripcion = "";
        dispatch( onChange(tipoActividad) );
    };
};

const setEstado = (tipoActividad, value) => {
    return ( dispatch ) => {
        tipoActividad.estado = value;
        tipoActividad.error.estado = false;
        tipoActividad.message.estado = "";
        dispatch( onChange(tipoActividad) );
    };
};

const setISDelete = (tipoActividad, value) => {
    return ( dispatch ) => {
        tipoActividad.isdelete = value;
        tipoActividad.error.isdelete = false;
        tipoActividad.message.isdelete = "";
        dispatch( onChange(tipoActividad) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipoactividad ) => {
    return ( dispatch ) => {
        TipoActividadService.onShow( 
            idtipoactividad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoActividad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipoactividad ) => {
    return ( dispatch ) => {
        TipoActividadService.onEdit( 
            idtipoactividad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoActividad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoActividad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoActividad ) ) {
            dispatch( onChange( tipoActividad ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoActividadService.onStore(
                tipoActividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoActividad.error.descripcion   = true;
                    tipoActividad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoActividad) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Actividad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoActividad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoActividad ) ) {
            dispatch( onChange( tipoActividad ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoActividadService.onUpdate(
                tipoActividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoActividad.error.descripcion   = true;
                    tipoActividad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoActividad) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Actividad", onOk: onUpdate,
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

const onDelete = ( tipoActividad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoActividadService.onDelete(
                tipoActividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoActividad() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Actividad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoActividadActions = {
    initData,
    onPageTipoActividad,
    getAllTipoActividad,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
