
import ConfirmationComponent from "../../../components/confirmation";
import { TipoCiudadService } from "../../services/parametros/tipo_ciudad.service";
import Constants from "../../constants/constans";

const setInit = () => ( {
    type: Constants.tipociudad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipociudad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipociudad_onChange,
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
    type: Constants.tipociudad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.tipociudad_onShow,
    payload: data,
} );
const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageTipoCiudad = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        TipoCiudadService.getAllTipoCiudad( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listTipoCiudad',
                        value: result.arrayTipoCiudad,
                    },
                    pagination: {
                        name: 'paginationTipoCiudad',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageTipoCiudad',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateTipoCiudad',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllTipoCiudad = () => {
    return ( dispatch ) => {
        TipoCiudadService.getAllTipoCiudad().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listTipoCiudad',
                    value: result.arrayTipoCiudad,
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

const setDescripcion = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.descripcion = value;
        tipoCiudad.error.descripcion = false;
        tipoCiudad.message.descripcion = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const setEstado = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.estado = value;
        tipoCiudad.error.estado = false;
        tipoCiudad.message.estado = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const setISDelete = (tipoCiudad, value) => {
    return ( dispatch ) => {
        tipoCiudad.isdelete = value;
        tipoCiudad.error.isdelete = false;
        tipoCiudad.message.isdelete = "";
        dispatch( onChange(tipoCiudad) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idtipociudad ) => {
    return ( dispatch ) => {
        TipoCiudadService.onShow( idtipociudad ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoCiudad ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idtipociudad ) => {
    return ( dispatch ) => {
        TipoCiudadService.onEdit( idtipociudad ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.tipoCiudad ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( tipoCiudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoCiudad ) ) {
            dispatch( onChange( tipoCiudad ) );
            return;
        }
        let onStore = () => {
            TipoCiudadService.onStore(tipoCiudad).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Tipo Ciudad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( tipoCiudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoCiudad ) ) {
            dispatch( onChange( tipoCiudad ) );
            return;
        }
        let onUpdate = () => {
            TipoCiudadService.onUpdate(tipoCiudad).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Tipo Ciudad", onOk: onUpdate,
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
    return bandera;
};

const onDelete = ( tipoCiudad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            TipoCiudadService.onDelete(tipoCiudad).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageTipoCiudad() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Tipo Ciudad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const TipoCiudadActions = {
    initData,
    onPageTipoCiudad,
    getAllTipoCiudad,
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
