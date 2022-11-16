
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { UnidadAcademicaService } from "../../services/estructuraacademica/unidad_academica.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.unidadacademica_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.unidadacademica_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.unidadacademica_onChange,
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
    type: Constants.unidadacademica_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.unidadacademica_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageUnidadAcademica = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        UnidadAcademicaService.getAllUnidadAcademica( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listUnidadAcademica',
                        value: result.arrayUnidadAcademica,
                    },
                    pagination: {
                        name: 'paginationUnidadAcademica',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageUnidadAcademica',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateUnidadAcademica',
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

const getAllUnidadAcademica = () => {
    return ( dispatch ) => {
        UnidadAcademicaService.getAllUnidadAcademica(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadAcademica',
                    value: result.arrayUnidadAcademica,
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

const setCodigo = (unidadAcademica, value) => {
    return ( dispatch ) => {
        unidadAcademica.codigo = value;
        unidadAcademica.error.codigo = false;
        unidadAcademica.message.codigo = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setSigla = (unidadAcademica, value) => {
    return ( dispatch ) => {
        unidadAcademica.sigla = value;
        unidadAcademica.error.sigla = false;
        unidadAcademica.message.sigla = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setDescripcion = (unidadAcademica, value) => {
    return ( dispatch ) => {
        unidadAcademica.descripcion = value;
        unidadAcademica.error.descripcion = false;
        unidadAcademica.message.descripcion = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setFKIDUnidadNegocio = (unidadAcademica, unidadNegocio) => {
    return ( dispatch ) => {
        unidadAcademica.fkidunidadnegocio = unidadNegocio.idunidadnegocio;
        unidadAcademica.unidadnegocio = unidadNegocio.descripcion;
        unidadAcademica.error.fkidunidadnegocio = false;
        unidadAcademica.message.fkidunidadnegocio = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setFKIDUnidadAdministrativa = (unidadAcademica, unidadAdministrativa) => {
    return ( dispatch ) => {
        unidadAcademica.fkidunidadadministrativa = unidadAdministrativa.idunidadadministrativa;
        unidadAcademica.unidadadministrativa = unidadAdministrativa.descripcion;
        unidadAcademica.fkidunidadnegocio = unidadAdministrativa.fkidunidadnegocio;
        unidadAcademica.unidadnegocio = unidadAdministrativa.unidadnegocio;
        unidadAcademica.error.fkidunidadadministrativa = false;
        unidadAcademica.message.fkidunidadadministrativa = "";
        unidadAcademica.error.fkidunidadnegocio = false;
        unidadAcademica.message.fkidunidadnegocio = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setEstado = (unidadAcademica, value) => {
    return ( dispatch ) => {
        unidadAcademica.estado = value;
        unidadAcademica.error.estado = false;
        unidadAcademica.message.estado = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const setISDelete = (unidadAcademica, value) => {
    return ( dispatch ) => {
        unidadAcademica.isdelete = value;
        unidadAcademica.error.isdelete = false;
        unidadAcademica.message.isdelete = "";
        dispatch( onChange(unidadAcademica) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idunidadacademica ) => {
    return ( dispatch ) => {
        UnidadAcademicaService.onShow( 
            idunidadacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadacademica ) => {
    return ( dispatch ) => {
        UnidadAcademicaService.onEdit( 
            idunidadacademica 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAcademica ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( unidadAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAcademica ) ) {
            dispatch( onChange( unidadAcademica ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            UnidadAcademicaService.onStore(
                unidadAcademica
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
            title: "Registrar Unidad Academica", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( unidadAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAcademica ) ) {
            dispatch( onChange( unidadAcademica ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            UnidadAcademicaService.onUpdate(
                unidadAcademica
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
            title: "Editar Unidad Academica", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.codigo.toString().trim().length === 0 ) {
        data.error.codigo   = true;
        data.message.codigo = "Campo requerido.";
        bandera = false;
    }
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
    if ( data.fkidunidadadministrativa.toString().trim().length === 0 ) {
        data.error.fkidunidadadministrativa   = true;
        data.message.fkidunidadadministrativa = "Campo requerido.";
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

const onDelete = ( unidadAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            UnidadAcademicaService.onDelete(
                unidadAcademica
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageUnidadAcademica() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Unidad Academica", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UnidadAcademicaActions = {
    initData,
    onPageUnidadAcademica,
    getAllUnidadAcademica,
    onLimpiar,
    setCodigo,
    setSigla,
    setDescripcion,
    setFKIDUnidadNegocio,
    setFKIDUnidadAdministrativa,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
