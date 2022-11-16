
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { CategoriaDocumentoService } from "../../services/persona/categoria_documento.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.categoriadocumento_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.categoriadocumento_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.categoriadocumento_onChange,
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
    type: Constants.categoriadocumento_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.categoriadocumento_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageCategoriaDocumento = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        CategoriaDocumentoService.getAllCategoriaDocumento( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listCategoriaDocumento',
                        value: result.arrayCategoriaDocumento,
                    },
                    pagination: {
                        name: 'paginationCategoriaDocumento',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageCategoriaDocumento',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateCategoriaDocumento',
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

const getAllCategoriaDocumento = () => {
    return ( dispatch ) => {
        CategoriaDocumentoService.getAllCategoriaDocumento(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listCategoriaDocumento',
                    value: result.arrayCategoriaDocumento,
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

const setDescripcion = (categoriaDocumento, value) => {
    return ( dispatch ) => {
        categoriaDocumento.descripcion = value;
        categoriaDocumento.error.descripcion = false;
        categoriaDocumento.message.descripcion = "";
        dispatch( onChange(categoriaDocumento) );
    };
};

const setEstado = (categoriaDocumento, value) => {
    return ( dispatch ) => {
        categoriaDocumento.estado = value;
        categoriaDocumento.error.estado = false;
        categoriaDocumento.message.estado = "";
        dispatch( onChange(categoriaDocumento) );
    };
};

const setISDelete = (categoriaDocumento, value) => {
    return ( dispatch ) => {
        categoriaDocumento.isdelete = value;
        categoriaDocumento.error.isdelete = false;
        categoriaDocumento.message.isdelete = "";
        dispatch( onChange(categoriaDocumento) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idcategoriaDocumento ) => {
    return ( dispatch ) => {
        CategoriaDocumentoService.onShow( 
            idcategoriaDocumento 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.categoriaDocumento ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idcategoriaDocumento ) => {
    return ( dispatch ) => {
        CategoriaDocumentoService.onEdit( 
            idcategoriaDocumento 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.categoriaDocumento ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( categoriaDocumento, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( categoriaDocumento ) ) {
            dispatch( onChange( categoriaDocumento ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CategoriaDocumentoService.onStore(
                categoriaDocumento
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
            title: "Registrar Categoria Documento", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( categoriaDocumento, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( categoriaDocumento ) ) {
            dispatch( onChange( categoriaDocumento ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            CategoriaDocumentoService.onUpdate(
                categoriaDocumento
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
            title: "Editar Categoria Documento", onOk: onUpdate,
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

const onDelete = ( categoriaDocumento ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            CategoriaDocumentoService.onDelete(
                categoriaDocumento
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageCategoriaDocumento() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Categoria Documento", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const CategoriaDocumentoActions = {
    initData,
    onPageCategoriaDocumento,
    getAllCategoriaDocumento,
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
