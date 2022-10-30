
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { PeriodoService } from "../../services/parametros/periodo.service";

const setInit = () => ( {
    type: Constants.periodo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.periodo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.periodo_onChange,
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
    type: Constants.periodo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.periodo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPagePeriodo = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        PeriodoService.getAllPeriodo( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listPeriodo',
                        value: result.arrayPeriodo,
                    },
                    pagination: {
                        name: 'paginationPeriodo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pagePeriodo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginatePeriodo',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
}; 

const getAllPeriodo = () => {
    return ( dispatch ) => {
        PeriodoService.getAllPeriodo().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listPeriodo',
                    value: result.arrayPeriodo,
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

const setSigla = (periodo, value) => {
    return ( dispatch ) => {
        periodo.sigla = value;
        periodo.error.sigla = false;
        periodo.message.sigla = "";
        dispatch( onChange(periodo) );
    };
};

const setDescripcion = (periodo, value) => {
    return ( dispatch ) => {
        periodo.descripcion = value;
        periodo.error.descripcion = false;
        periodo.message.descripcion = "";
        dispatch( onChange(periodo) );
    };
};

const setEstado = (periodo, value) => {
    return ( dispatch ) => {
        periodo.estado = value;
        periodo.error.estado = false;
        periodo.message.estado = "";
        dispatch( onChange(periodo) );
    };
};

const setISDelete = (periodo, value) => {
    return ( dispatch ) => {
        periodo.isdelete = value;
        periodo.error.isdelete = false;
        periodo.message.isdelete = "";
        dispatch( onChange(periodo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idperiodo ) => {
    return ( dispatch ) => {
        PeriodoService.onShow( idperiodo ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.periodo ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idperiodo ) => {
    return ( dispatch ) => {
        PeriodoService.onEdit( idperiodo ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.periodo ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( periodo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( periodo ) ) {
            dispatch( onChange( periodo ) );
            return;
        }
        let onStore = () => {
            PeriodoService.onStore(periodo).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Periodo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( periodo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( periodo ) ) {
            dispatch( onChange( periodo ) );
            return;
        }
        let onUpdate = () => {
            PeriodoService.onUpdate(periodo).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Periodo", onOk: onUpdate,
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

const onDelete = ( periodo ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            PeriodoService.onDelete(periodo).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPagePeriodo() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Periodo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const PeriodoActions = {
    initData,
    onPagePeriodo,
    getAllPeriodo,
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
