
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { ModalidadAcademicaService } from "../../services/parametros/modalidad_academica.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.modalidad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.modalidad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.modalidad_onChange,
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
    type: Constants.modalidad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.modalidad_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageModalidadAcademica = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ModalidadAcademicaService.getAllModalidadAcademica( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listModalidadAcademica',
                        value: result.arrayModalidadAcademica,
                    },
                    pagination: {
                        name: 'paginationModalidadAcademica',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageModalidadAcademica',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateModalidadAcademica',
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

const getAllModalidadAcademica = () => {
    return ( dispatch ) => {
        ModalidadAcademicaService.getAllModalidadAcademica(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listModalidadAcademica',
                    value: result.arrayModalidadAcademica,
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

const setSigla = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.sigla = value;
        modalidadAcademica.error.sigla = false;
        modalidadAcademica.message.sigla = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setDescripcion = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.descripcion = value;
        modalidadAcademica.error.descripcion = false;
        modalidadAcademica.message.descripcion = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setEstado = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.estado = value;
        modalidadAcademica.error.estado = false;
        modalidadAcademica.message.estado = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setISDelete = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.isdelete = value;
        modalidadAcademica.error.isdelete = false;
        modalidadAcademica.message.isdelete = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idmodalidadacademica ) => {
    return ( dispatch ) => {
        ModalidadAcademicaService.onShow( 
            idmodalidadacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.modalidadAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idmodalidadacademica ) => {
    return ( dispatch ) => {
        ModalidadAcademicaService.onEdit( 
            idmodalidadacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.modalidadAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( modalidadAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( modalidadAcademica ) ) {
            dispatch( onChange( modalidadAcademica ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ModalidadAcademicaService.onStore(
                modalidadAcademica
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
            title: "Registrar Modalidad Academica", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( modalidadAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( modalidadAcademica ) ) {
            dispatch( onChange( modalidadAcademica ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ModalidadAcademicaService.onUpdate(
                modalidadAcademica
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
            title: "Editar Modalidad Academica", onOk: onUpdate,
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

const onDelete = ( modalidadAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ModalidadAcademicaService.onDelete(
                modalidadAcademica
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageModalidadAcademica() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Modalidad Academica", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ModalidadAcademicaActions = {
    initData,
    onPageModalidadAcademica,
    getAllModalidadAcademica,
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
