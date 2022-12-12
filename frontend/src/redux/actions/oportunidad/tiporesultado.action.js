
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoResultadoService } from '../../services/oportunidad/tiporesultado.service';

const setInit = () => ( {
    type: Constants.tiporesultado_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tiporesultado_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tiporesultado_onChange,
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
    type: Constants.tiporesultado_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tiporesultado_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoResultado = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoResultadoService.getAllTipoResultado( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoResultado',
                        value: result.arrayTipoResultado,
                    },
                    pagination: {
                        name: 'paginationTipoResultado',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoResultado',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoResultado',
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

const getAllTipoResultado = () => {
    return ( dispatch ) => {
        TipoResultadoService.getAllTipoResultado(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoResultado',
                    value: result.arrayTipoResultado,
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

const setSigla = (tipoResultado, value) => {
    return ( dispatch ) => {
        tipoResultado.sigla = value;
        tipoResultado.error.sigla = false;
        tipoResultado.message.sigla = "";
        dispatch( onChange(tipoResultado) );
    };
};

const setDescripcion = (tipoResultado, value) => {
    return ( dispatch ) => {
        tipoResultado.descripcion = value;
        tipoResultado.error.descripcion = false;
        tipoResultado.message.descripcion = "";
        dispatch( onChange(tipoResultado) );
    };
};

const setEstado = (tipoResultado, value) => {
    return ( dispatch ) => {
        tipoResultado.estado = value;
        tipoResultado.error.estado = false;
        tipoResultado.message.estado = "";
        dispatch( onChange(tipoResultado) );
    };
};

const setISDelete = (tipoResultado, value) => {
    return ( dispatch ) => {
        tipoResultado.isdelete = value;
        tipoResultado.error.isdelete = false;
        tipoResultado.message.isdelete = "";
        dispatch( onChange(tipoResultado) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtiporesultado ) => {
    return ( dispatch ) => {
        TipoResultadoService.onShow( 
            idtiporesultado 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoResultado ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtiporesultado ) => {
    return ( dispatch ) => {
        TipoResultadoService.onEdit( 
            idtiporesultado 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoResultado ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoResultado, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoResultado ) ) {
            dispatch( onChange( tipoResultado ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoResultadoService.onStore(
                tipoResultado
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoResultado.error.descripcion   = true;
                    tipoResultado.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoResultado) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Resultado", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoResultado, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoResultado ) ) {
            dispatch( onChange( tipoResultado ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoResultadoService.onUpdate(
                tipoResultado
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoResultado.error.descripcion   = true;
                    tipoResultado.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoResultado) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Resultado", onOk: onUpdate,
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

const onDelete = ( tipoResultado ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoResultadoService.onDelete(
                tipoResultado
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoResultado() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Resultado", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoResultadoActions = {
    initData,
    onPageTipoResultado,
    getAllTipoResultado,
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
