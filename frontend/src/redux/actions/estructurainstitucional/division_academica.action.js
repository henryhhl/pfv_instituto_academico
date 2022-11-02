
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { DivisionAcademicaService } from "../../services/estructurainstitucional/division_academica.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setInit = () => ( {
    type: Constants.divisionacademica_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.divisionacademica_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.divisionacademica_onChange,
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
    type: Constants.divisionacademica_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.divisionacademica_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageDivisionAcademica = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        DivisionAcademicaService.getAllDivisionAcademica( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listDivisionAcademica',
                        value: result.arrayDivisionAcademica,
                    },
                    pagination: {
                        name: 'paginationDivisionAcademica',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageDivisionAcademica',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateDivisionAcademica',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllDivisionAcademica = () => {
    return ( dispatch ) => {
        DivisionAcademicaService.getAllDivisionAcademica().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listDivisionAcademica',
                    value: result.arrayDivisionAcademica,
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

const setSigla = (divisionAcademica, value) => {
    return ( dispatch ) => {
        divisionAcademica.sigla = value;
        divisionAcademica.error.sigla = false;
        divisionAcademica.message.sigla = "";
        dispatch( onChange(divisionAcademica) );
    };
};

const setDescripcion = (divisionAcademica, value) => {
    return ( dispatch ) => {
        divisionAcademica.descripcion = value;
        divisionAcademica.error.descripcion = false;
        divisionAcademica.message.descripcion = "";
        dispatch( onChange(divisionAcademica) );
    };
};

const setOrden = (divisionAcademica, value) => {
    return ( dispatch ) => {
        if ( !isNaN(value) ) {
            divisionAcademica.orden = value;
            divisionAcademica.error.orden = false;
            divisionAcademica.message.orden = "";
            dispatch( onChange(divisionAcademica) );
        }
    };
};

const setEstado = (divisionAcademica, value) => {
    return ( dispatch ) => {
        divisionAcademica.estado = value;
        divisionAcademica.error.estado = false;
        divisionAcademica.message.estado = "";
        dispatch( onChange(divisionAcademica) );
    };
};

const setISDelete = (divisionAcademica, value) => {
    return ( dispatch ) => {
        divisionAcademica.isdelete = value;
        divisionAcademica.error.isdelete = false;
        divisionAcademica.message.isdelete = "";
        dispatch( onChange(divisionAcademica) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( iddivisionacademica ) => {
    return ( dispatch ) => {
        DivisionAcademicaService.onShow( iddivisionacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.divisionAcademica ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( iddivisionacademica ) => {
    return ( dispatch ) => {
        DivisionAcademicaService.onEdit( iddivisionacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.divisionAcademica ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( divisionAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( divisionAcademica ) ) {
            dispatch( onChange( divisionAcademica ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            DivisionAcademicaService.onStore(divisionAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Division Academica", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( divisionAcademica, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( divisionAcademica ) ) {
            dispatch( onChange( divisionAcademica ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            DivisionAcademicaService.onUpdate(divisionAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Division Academica", onOk: onUpdate,
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
    if ( data.orden.toString().trim().length === 0 ) {
        data.error.orden   = true;
        data.message.orden = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( divisionAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            DivisionAcademicaService.onDelete(divisionAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageDivisionAcademica() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Division Academica", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const DivisionAcademicaActions = {
    initData,
    onPageDivisionAcademica,
    getAllDivisionAcademica,
    onLimpiar,
    setSigla,
    setDescripcion,
    setOrden,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
