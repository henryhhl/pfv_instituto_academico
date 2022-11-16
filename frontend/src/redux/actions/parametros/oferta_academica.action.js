
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { OfertaAcademicaService } from "../../services/parametros/oferta_academica.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.ofertaAcademica_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.ofertaAcademica_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.ofertaAcademica_onChange,
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
    type: Constants.ofertaAcademica_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.ofertaAcademica_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageOfertaAcademica = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        OfertaAcademicaService.getAllOfertaAcademica( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listOfertaAcademica',
                        value: result.arrayOfertaAcademica,
                    },
                    pagination: {
                        name: 'paginationOfertaAcademica',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageOfertaAcademica',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateOfertaAcademica',
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

const getAllOfertaAcademica = () => {
    return ( dispatch ) => {
        OfertaAcademicaService.getAllOfertaAcademica(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listOfertaAcademica',
                    value: result.arrayOfertaAcademica,
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

const setSigla = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.sigla = value;
        ofertaAcademica.error.sigla = false;
        ofertaAcademica.message.sigla = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setDescripcion = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.descripcion = value;
        ofertaAcademica.error.descripcion = false;
        ofertaAcademica.message.descripcion = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setEstado = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.estado = value;
        ofertaAcademica.error.estado = false;
        ofertaAcademica.message.estado = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setISDelete = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.isdelete = value;
        ofertaAcademica.error.isdelete = false;
        ofertaAcademica.message.isdelete = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idofertaacademica ) => {
    return ( dispatch ) => {
        OfertaAcademicaService.onShow( 
            idofertaacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ofertaAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idofertaacademica ) => {
    return ( dispatch ) => {
        OfertaAcademicaService.onEdit( 
            idofertaacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ofertaAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( ofertaAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( ofertaAcademica ) ) {
            dispatch( onChange( ofertaAcademica ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            OfertaAcademicaService.onStore(
                ofertaAcademica
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
            title: "Registrar Oferta Academica", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( ofertaAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( ofertaAcademica ) ) {
            dispatch( onChange( ofertaAcademica ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            OfertaAcademicaService.onUpdate(
                ofertaAcademica
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
            title: "Editar Oferta Academica", onOk: onUpdate,
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

const onDelete = ( ofertaAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            OfertaAcademicaService.onDelete(
                ofertaAcademica
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageOfertaAcademica() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Oferta Academica", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const OfertaAcademicaActions = {
    initData,
    onPageOfertaAcademica,
    getAllOfertaAcademica,
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
