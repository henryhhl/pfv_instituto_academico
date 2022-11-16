
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { TipoMateriaService } from "../../services/parametros/tipo_materia.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.tipoMateria_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipoMateria_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipoMateria_onChange,
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
    type: Constants.tipoMateria_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipoMateria_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoMateria = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoMateriaService.getAllTipoMateria( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoMateria',
                        value: result.arrayTipoMateria,
                    },
                    pagination: {
                        name: 'paginationTipoMateria',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoMateria',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoMateria',
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

const getAllTipoMateria = () => {
    return ( dispatch ) => {
        TipoMateriaService.getAllTipoMateria(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoMateria',
                    value: result.arrayTipoMateria,
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

const setSigla = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.sigla = value;
        tipoMateria.error.sigla = false;
        tipoMateria.message.sigla = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setDescripcion = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.descripcion = value;
        tipoMateria.error.descripcion = false;
        tipoMateria.message.descripcion = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setEstado = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.estado = value;
        tipoMateria.error.estado = false;
        tipoMateria.message.estado = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setISDelete = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.isdelete = value;
        tipoMateria.error.isdelete = false;
        tipoMateria.message.isdelete = "";
        dispatch( onChange(tipoMateria) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipomateria ) => {
    return ( dispatch ) => {
        TipoMateriaService.onShow( 
            idtipomateria 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoMateria ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipomateria ) => {
    return ( dispatch ) => {
        TipoMateriaService.onEdit( 
            idtipomateria 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoMateria ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoMateria, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoMateria ) ) {
            dispatch( onChange( tipoMateria ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            TipoMateriaService.onStore(
                tipoMateria
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
            title: "Registrar Tipo Materia", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoMateria, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoMateria ) ) {
            dispatch( onChange( tipoMateria ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            TipoMateriaService.onUpdate(
                tipoMateria
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
            title: "Editar Tipo Materia", onOk: onUpdate,
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

const onDelete = ( tipoMateria ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            TipoMateriaService.onDelete(
                tipoMateria
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoMateria() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Materia", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoMateriaActions = {
    initData,
    onPageTipoMateria,
    getAllTipoMateria,
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
