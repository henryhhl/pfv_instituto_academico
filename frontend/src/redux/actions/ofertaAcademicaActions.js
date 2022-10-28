
import ConfirmationComponent from "../../components/confirmation";
import Constants from "../constants/constans";
import { OfertaAcademicaService } from "../services/ofertaAcademica.service";

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
        } ).then( (result) => {
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
            }
        } ).finally( () => {} );
    };
};

const getAllOfertaAcademica = () => {
    return ( dispatch ) => {
        OfertaAcademicaService.getAllOfertaAcademica().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listOfertaAcademica',
                    value: result.arrayOfertaAcademica,
                };
                dispatch( onListModule(obj) );
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
        OfertaAcademicaService.onShow( idofertaacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ofertaAcademica ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idofertaacademica ) => {
    return ( dispatch ) => {
        OfertaAcademicaService.onEdit( idofertaacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ofertaAcademica ) );
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
            OfertaAcademicaService.onStore(ofertaAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
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
            OfertaAcademicaService.onUpdate(ofertaAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
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
    return bandera;
};

const onDelete = ( ofertaAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            OfertaAcademicaService.onDelete(ofertaAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageOfertaAcademica() );
                }
            } ).finally( () => {} );
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
