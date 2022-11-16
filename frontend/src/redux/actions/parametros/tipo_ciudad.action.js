
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoCiudadService } from "../../services/parametros/tipo_ciudad.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.tipociudad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipociudad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipociudad_onChange,
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
    type: Constants.tipociudad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipociudad_onShow,
    payload: data,
} );
const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoCiudad = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoCiudadService.getAllTipoCiudad( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoCiudad',
                        value: result.arrayTipoCiudad,
                    },
                    pagination: {
                        name: 'paginationTipoCiudad',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoCiudad',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoCiudad',
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

const getAllTipoCiudad = () => {
    return ( dispatch ) => {
        TipoCiudadService.getAllTipoCiudad(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoCiudad',
                    value: result.arrayTipoCiudad,
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

const setDescripcion = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.descripcion = value;
        tipoCiudad.error.descripcion = false;
        tipoCiudad.message.descripcion = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const setEstado = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.estado = value;
        tipoCiudad.error.estado = false;
        tipoCiudad.message.estado = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const setISDelete = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.isdelete = value;
        tipoCiudad.error.isdelete = false;
        tipoCiudad.message.isdelete = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipociudad ) => {
    return ( dispatch ) => {
        TipoCiudadService.onShow( 
            idtipociudad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoCiudad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipociudad ) => {
    return ( dispatch ) => {
        TipoCiudadService.onEdit( 
            idtipociudad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoCiudad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoCiudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoCiudad ) ) {
            dispatch( onChange( tipoCiudad ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoCiudadService.onStore(
                tipoCiudad
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
            title: "Registrar Tipo Ciudad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoCiudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoCiudad ) ) {
            dispatch( onChange( tipoCiudad ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoCiudadService.onUpdate(
                tipoCiudad
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
            title: "Editar Tipo Ciudad", onOk: onUpdate,
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

const onDelete = ( tipoCiudad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoCiudadService.onDelete(
                tipoCiudad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoCiudad() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Ciudad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoCiudadActions = {
    initData,
    onPageTipoCiudad,
    getAllTipoCiudad,
    onLimpiar,
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
