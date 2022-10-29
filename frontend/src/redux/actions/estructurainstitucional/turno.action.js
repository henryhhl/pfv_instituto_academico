
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { TurnoService } from "../../services/estructurainstitucional/turno.service";

const setInit = () => ( {
    type: Constants.turno_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.turno_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.turno_onChange,
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
    type: Constants.turno_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.turno_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTurno = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TurnoService.getAllTurno( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTurno',
                        value: result.arrayTurno,
                    },
                    pagination: {
                        name: 'paginationTurno',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTurno',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTurno',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllTurno = () => {
    return ( dispatch ) => {
        TurnoService.getAllTurno().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTurno',
                    value: result.arrayTurno,
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

const setSigla = (turno, value) => {
    return ( dispatch ) => {
        turno.sigla = value;
        turno.error.sigla = false;
        turno.message.sigla = "";
        dispatch( onChange(turno) );
    };
};

const setDescripcion = (turno, value) => {
    return ( dispatch ) => {
        turno.descripcion = value;
        turno.error.descripcion = false;
        turno.message.descripcion = "";
        dispatch( onChange(turno) );
    };
};

const setEstado = (turno, value) => {
    return ( dispatch ) => {
        turno.estado = value;
        turno.error.estado = false;
        turno.message.estado = "";
        dispatch( onChange(turno) );
    };
};

const setISDelete = (turno, value) => {
    return ( dispatch ) => {
        turno.isdelete = value;
        turno.error.isdelete = false;
        turno.message.isdelete = "";
        dispatch( onChange(turno) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idturno ) => {
    return ( dispatch ) => {
        TurnoService.onShow( idturno ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.turno ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idturno ) => {
    return ( dispatch ) => {
        TurnoService.onEdit( idturno ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.turno ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( turno, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( turno ) ) {
            dispatch( onChange( turno ) );
            return;
        }
        let onStore = () => {
            TurnoService.onStore(turno).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Turno", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( turno, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( turno ) ) {
            dispatch( onChange( turno ) );
            return;
        }
        let onUpdate = () => {
            TurnoService.onUpdate(turno).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Turno", onOk: onUpdate,
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

const onDelete = ( turno ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            TurnoService.onDelete(turno).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTurno() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Turno", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TurnoActions = {
    initData,
    onPageTurno,
    getAllTurno,
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
