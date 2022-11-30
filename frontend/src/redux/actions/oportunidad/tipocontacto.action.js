
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoContactoService } from "../../services/oportunidad/tipocontacto.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.tipocontacto_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipocontacto_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipocontacto_onChange,
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
    type: Constants.tipocontacto_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipocontacto_onShow,
    payload: data,
} );
const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoContacto = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoContactoService.getAllTipoContacto( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoContacto',
                        value: result.arrayTipoContacto,
                    },
                    pagination: {
                        name: 'paginationTipoContacto',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoContacto',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoContacto',
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

const getAllTipoContacto = () => {
    return ( dispatch ) => {
        TipoContactoService.getAllTipoContacto( {
            
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoContacto',
                    value: result.arrayTipoContacto,
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

const setSigla = (tipoContacto, value) => {
    return ( dispatch ) => {
        tipoContacto.sigla = value;
        tipoContacto.error.sigla = false;
        tipoContacto.message.sigla = "";
        dispatch( onChange(tipoContacto) );
    };
};

const setDescripcion = (tipoContacto, value) => {
    return ( dispatch ) => {
        tipoContacto.descripcion = value;
        tipoContacto.error.descripcion = false;
        tipoContacto.message.descripcion = "";
        dispatch( onChange(tipoContacto) );
    };
};

const setEstado = (tipoContacto, value) => {
    return ( dispatch ) => {
        tipoContacto.estado = value;
        tipoContacto.error.estado = false;
        tipoContacto.message.estado = "";
        dispatch( onChange(tipoContacto) );
    };
};

const setISDelete = (tipoContacto, value) => {
    return ( dispatch ) => {
        tipoContacto.isdelete = value;
        tipoContacto.error.isdelete = false;
        tipoContacto.message.isdelete = "";
        dispatch( onChange(tipoContacto) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipocontacto ) => {
    return ( dispatch ) => {
        TipoContactoService.onShow( 
            idtipocontacto 
        ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoContacto ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipocontacto ) => {
    return ( dispatch ) => {
        TipoContactoService.onEdit( 
            idtipocontacto 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoContacto ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoContacto, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoContacto ) ) {
            dispatch( onChange( tipoContacto ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoContactoService.onStore(
                tipoContacto
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoContacto.error.descripcion   = true;
                    tipoContacto.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoContacto) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Contacto", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoContacto, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoContacto ) ) {
            dispatch( onChange( tipoContacto ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoContactoService.onUpdate(
                tipoContacto
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    tipoContacto.error.descripcion   = true;
                    tipoContacto.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(tipoContacto) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Contacto", onOk: onUpdate,
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

const onDelete = ( tipoContacto ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoContactoService.onDelete(
                tipoContacto
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoContacto() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Contacto", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoContactoActions = {
    initData,
    getAllTipoContacto,
    onPageTipoContacto,
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
