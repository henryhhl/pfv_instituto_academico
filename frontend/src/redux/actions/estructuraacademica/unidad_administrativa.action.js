
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { UnidadAdministrativaService } from "../../services/estructuraacademica/unidad_administrativa.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.unidadadministrativa_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.unidadadministrativa_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.unidadadministrativa_onChange,
    payload: data,
} );

const onAddRowTurno = ( ) => ( {
    type: Constants.unidadadministrativa_onAddRowTurno,
} );

const onDeleteRowTurno = ( index ) => ( {
    type: Constants.unidadadministrativa_onDeleteRowTurno,
    payload: index,
} );

const onAddRowAula = ( ) => ( {
    type: Constants.unidadadministrativa_onAddRowAula,
} );

const onDeleteRowAula = ( index ) => ( {
    type: Constants.unidadadministrativa_onDeleteRowAula,
    payload: index,
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
    type: Constants.unidadadministrativa_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.unidadadministrativa_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageUnidadAdministrativa = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.getAllUnidadAdministrativa( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listUnidadAdministrativa',
                        value: result.arrayUnidadAdministrativa,
                    },
                    pagination: {
                        name: 'paginationUnidadAdministrativa',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageUnidadAdministrativa',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateUnidadAdministrativa',
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

const getAllUnidadAdministrativa = () => {
    return ( dispatch ) => {
        UnidadAdministrativaService.getAllUnidadAdministrativa(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadAdministrativa',
                    value: result.arrayUnidadAdministrativa,
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

const setSigla = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.sigla = value;
        unidadAdministrativa.error.sigla = false;
        unidadAdministrativa.message.sigla = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setDescripcion = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.descripcion = value;
        unidadAdministrativa.error.descripcion = false;
        unidadAdministrativa.message.descripcion = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setFKIDUnidadNegocio = (unidadAdministrativa, unidadNegocio) => {
    return ( dispatch ) => {
        unidadAdministrativa.fkidunidadnegocio = unidadNegocio.idunidadnegocio;
        unidadAdministrativa.unidadnegocio = unidadNegocio.descripcion;
        unidadAdministrativa.error.fkidunidadnegocio = false;
        unidadAdministrativa.message.fkidunidadnegocio = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setEstado = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.estado = value;
        unidadAdministrativa.error.estado = false;
        unidadAdministrativa.message.estado = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setISDelete = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.isdelete = value;
        unidadAdministrativa.error.isdelete = false;
        unidadAdministrativa.message.isdelete = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idunidadadministrativa ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.onShow( 
            idunidadadministrativa 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAdministrativa ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadadministrativa ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.onEdit( 
            idunidadadministrativa 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAdministrativa ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( unidadAdministrativa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAdministrativa ) ) {
            dispatch( onChange( unidadAdministrativa ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            UnidadAdministrativaService.onStore(
                unidadAdministrativa
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
            title: "Registrar Unidad Administrativa", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( unidadAdministrativa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAdministrativa ) ) {
            dispatch( onChange( unidadAdministrativa ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            UnidadAdministrativaService.onUpdate(
                unidadAdministrativa
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
            title: "Editar Unidad Administrativa", onOk: onUpdate,
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
    if ( data.fkidunidadnegocio.toString().trim().length === 0 ) {
        data.error.fkidunidadnegocio   = true;
        data.message.fkidunidadnegocio = "Campo requerido.";
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

const onDelete = ( unidadAdministrativa ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            UnidadAdministrativaService.onDelete(
                unidadAdministrativa
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageUnidadAdministrativa() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Unidad Administrativa", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UnidadAdministrativaActions = {
    initData,
    onPageUnidadAdministrativa,
    getAllUnidadAdministrativa,
    onLimpiar,
    onChange,
    onAddRowTurno,
    onDeleteRowTurno,
    onAddRowAula,
    onDeleteRowAula,
    setSigla,
    setDescripcion,
    setFKIDUnidadNegocio,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
