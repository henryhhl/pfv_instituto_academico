
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { GestionPeriodoService } from "../../services/estructurainstitucional/gestion_periodo.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.gestionperiodo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.gestionperiodo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.gestionperiodo_onChange,
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
    type: Constants.gestionperiodo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.gestionperiodo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageGestionPeriodo = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        GestionPeriodoService.getAllGestionPeriodo( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listGestionPeriodo',
                        value: result.arrayGestionPeriodo,
                    },
                    pagination: {
                        name: 'paginationGestionPeriodo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageGestionPeriodo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateGestionPeriodo',
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

const getAllGestionPeriodo = () => {
    return ( dispatch ) => {
        GestionPeriodoService.getAllGestionPeriodo(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listGestionPeriodo',
                    value: result.arrayGestionPeriodo,
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

const setDescripcion = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        gestionPeriodo.descripcion = value;
        gestionPeriodo.error.descripcion = false;
        gestionPeriodo.message.descripcion = "";
        dispatch( onChange(gestionPeriodo) );
    };
};

const setOrden = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) ) {
            gestionPeriodo.orden = value;
            gestionPeriodo.error.orden = false;
            gestionPeriodo.message.orden = "";
            dispatch( onChange(gestionPeriodo) );
        }
    };
};

const setFechaInicio = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        if ( Functions.compareInitDateString(value, gestionPeriodo.fechafinal) ) {
            if ( value === "" ) {
                gestionPeriodo.fechafinal = "";
            }
            gestionPeriodo.fechainicio = value;
        } else {
            gestionPeriodo.fechainicio = "";
        }
        gestionPeriodo.error.fechainicio = false;
        gestionPeriodo.message.fechainicio = "";
        dispatch( onChange(gestionPeriodo) );
    };
};

const setFechaFinal = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        if ( Functions.compareInitDateString(gestionPeriodo.fechainicio, value) ) {
            gestionPeriodo.fechafinal = value;
            dispatch( onChange(gestionPeriodo) );
        } else {
            gestionPeriodo.fechafinal = "";
        }
        gestionPeriodo.error.fechafinal = false;
        gestionPeriodo.message.fechafinal = "";
        dispatch( onChange(gestionPeriodo) );
    };
};

const setEstado = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        gestionPeriodo.estado = value;
        gestionPeriodo.error.estado = false;
        gestionPeriodo.message.estado = "";
        dispatch( onChange(gestionPeriodo) );
    };
};

const setISDelete = (gestionPeriodo, value) => {
    return ( dispatch ) => {
        gestionPeriodo.isdelete = value;
        gestionPeriodo.error.isdelete = false;
        gestionPeriodo.message.isdelete = "";
        dispatch( onChange(gestionPeriodo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idgestionperiodo ) => {
    return ( dispatch ) => {
        GestionPeriodoService.onShow( 
            idgestionperiodo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.gestionPeriodo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idgestionperiodo ) => {
    return ( dispatch ) => {
        GestionPeriodoService.onEdit( 
            idgestionperiodo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.gestionPeriodo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( gestionPeriodo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( gestionPeriodo ) ) {
            dispatch( onChange( gestionPeriodo ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            GestionPeriodoService.onStore(
                gestionPeriodo
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
            title: "Registrar Gestión Periodo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( gestionPeriodo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( gestionPeriodo ) ) {
            dispatch( onChange( gestionPeriodo ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            GestionPeriodoService.onUpdate(
                gestionPeriodo
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
            title: "Editar Gestión Periodo", onOk: onUpdate,
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
    if ( data.orden.toString().trim().length === 0 ) {
        data.error.orden   = true;
        data.message.orden = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechainicio.toString().trim().length === 0 ) {
        data.error.fechainicio   = true;
        data.message.fechainicio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechafinal.toString().trim().length === 0 ) {
        data.error.fechafinal   = true;
        data.message.fechafinal = "Campo requerido.";
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

const onDelete = ( gestionPeriodo ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            GestionPeriodoService.onDelete(
                gestionPeriodo
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageGestionPeriodo() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Gestión Periodo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const GestionPeriodoActions = {
    initData,
    onPageGestionPeriodo,
    getAllGestionPeriodo,
    onLimpiar,
    setDescripcion,
    setOrden,
    setFechaInicio,
    setFechaFinal,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
