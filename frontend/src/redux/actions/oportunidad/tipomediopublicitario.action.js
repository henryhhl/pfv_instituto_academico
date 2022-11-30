
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoMedioPublicitarioService } from '../../services/oportunidad/tipomediopublicitario.service';

const setInit = () => ( {
    type: Constants.tipomediopublicitario_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipomediopublicitario_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipomediopublicitario_onChange,
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
    type: Constants.tipomediopublicitario_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipomediopublicitario_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoMedioPublicitario = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoMedioPublicitarioService.getAllTipoMedioPublicitario( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoMedioPublicitario',
                        value: result.arrayTipoMedioPublicitario,
                    },
                    pagination: {
                        name: 'paginationTipoMedioPublicitario',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoMedioPublicitario',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoMedioPublicitario',
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

const getAllTipoMedioPublicitario = () => {
    return ( dispatch ) => {
        TipoMedioPublicitarioService.getAllTipoMedioPublicitario(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoMedioPublicitario',
                    value: result.arrayTipoMedioPublicitario,
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

const setSigla = (tipoMedioPublicitario, value) => {
    return ( dispatch ) => {
        tipoMedioPublicitario.sigla = value;
        tipoMedioPublicitario.error.sigla = false;
        tipoMedioPublicitario.message.sigla = "";
        dispatch( onChange(tipoMedioPublicitario) );
    };
};

const setDescripcion = (tipoMedioPublicitario, value) => {
    return ( dispatch ) => {
        tipoMedioPublicitario.descripcion = value;
        tipoMedioPublicitario.error.descripcion = false;
        tipoMedioPublicitario.message.descripcion = "";
        dispatch( onChange(tipoMedioPublicitario) );
    };
};

const setEstado = (tipoMedioPublicitario, value) => {
    return ( dispatch ) => {
        tipoMedioPublicitario.estado = value;
        tipoMedioPublicitario.error.estado = false;
        tipoMedioPublicitario.message.estado = "";
        dispatch( onChange(tipoMedioPublicitario) );
    };
};

const setISDelete = (tipoMedioPublicitario, value) => {
    return ( dispatch ) => {
        tipoMedioPublicitario.isdelete = value;
        tipoMedioPublicitario.error.isdelete = false;
        tipoMedioPublicitario.message.isdelete = "";
        dispatch( onChange(tipoMedioPublicitario) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipomediopublicitario ) => {
    return ( dispatch ) => {
        TipoMedioPublicitarioService.onShow( 
            idtipomediopublicitario 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoMedioPublicitario ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipomediopublicitario ) => {
    return ( dispatch ) => {
        TipoMedioPublicitarioService.onEdit( 
            idtipomediopublicitario 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoMedioPublicitario ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoMedioPublicitario, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoMedioPublicitario ) ) {
            dispatch( onChange( tipoMedioPublicitario ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoMedioPublicitarioService.onStore(
                tipoMedioPublicitario
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoMedioPublicitario.error.descripcion   = true;
                    tipoMedioPublicitario.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoMedioPublicitario) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Medio Publicitario", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoMedioPublicitario, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoMedioPublicitario ) ) {
            dispatch( onChange( tipoMedioPublicitario ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoMedioPublicitarioService.onUpdate(
                tipoMedioPublicitario
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoMedioPublicitario.error.descripcion   = true;
                    tipoMedioPublicitario.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoMedioPublicitario) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Medio Publicitario", onOk: onUpdate,
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

const onDelete = ( tipoMedioPublicitario ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoMedioPublicitarioService.onDelete(
                tipoMedioPublicitario
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoMedioPublicitario() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Medio Publicitario", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoMedioPublicitarioActions = {
    initData,
    onPageTipoMedioPublicitario,
    getAllTipoMedioPublicitario,
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
