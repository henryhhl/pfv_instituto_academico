
import ConfirmationComponent from "../../../components/confirmation";
import { ReferenciaContactoService } from "../../services/parametros/referencia_contacto.service";
import Constants from "../../constants/constans";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setInit = () => ( {
    type: Constants.referenciaContacto_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.referenciaContacto_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.referenciaContacto_onChange,
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
    type: Constants.referenciaContacto_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.referenciaContacto_onShow,
    payload: data,
} );
const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageReferenciaContacto = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ReferenciaContactoService.getAllReferenciaContacto( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listReferenciaContacto',
                        value: result.arrayReferenciaContacto,
                    },
                    pagination: {
                        name: 'paginationReferenciaContacto',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageReferenciaContacto',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateReferenciaContacto',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllReferenciaContacto = () => {
    return ( dispatch ) => {
        ReferenciaContactoService.getAllReferenciaContacto( {
            
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listReferenciaContacto',
                    value: result.arrayReferenciaContacto,
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

const setDescripcion = (referenciaContacto, value) => {
    return ( dispatch ) => {
        referenciaContacto.descripcion = value;
        referenciaContacto.error.descripcion = false;
        referenciaContacto.message.descripcion = "";
        dispatch( onChange(referenciaContacto) );
    };
};

const setTipoReferenciaContacto = (referenciaContacto, value) => {
    return ( dispatch ) => {
        referenciaContacto.tiporeferenciacontacto = value;
        referenciaContacto.error.tiporeferenciacontacto = false;
        referenciaContacto.message.tiporeferenciacontacto = "";
        dispatch( onChange(referenciaContacto) );
    };
};

const setEstado = (referenciaContacto, value) => {
    return ( dispatch ) => {
        referenciaContacto.estado = value;
        referenciaContacto.error.estado = false;
        referenciaContacto.message.estado = "";
        dispatch( onChange(referenciaContacto) );
    };
};

const setISDelete = (referenciaContacto, value) => {
    return ( dispatch ) => {
        referenciaContacto.isdelete = value;
        referenciaContacto.error.isdelete = false;
        referenciaContacto.message.isdelete = "";
        dispatch( onChange(referenciaContacto) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idreferenciacontacto ) => {
    return ( dispatch ) => {
        ReferenciaContactoService.onShow( idreferenciacontacto ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.referenciaContacto ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idreferenciacontacto ) => {
    return ( dispatch ) => {
        ReferenciaContactoService.onEdit( idreferenciacontacto ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.referenciaContacto ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( referenciaContacto, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( referenciaContacto ) ) {
            dispatch( onChange( referenciaContacto ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ReferenciaContactoService.onStore(referenciaContacto).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Referencia Contacto", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( referenciaContacto, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( referenciaContacto ) ) {
            dispatch( onChange( referenciaContacto ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ReferenciaContactoService.onUpdate(referenciaContacto).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Referencia Contacto", onOk: onUpdate,
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
    // if ( data.tiporeferenciacontacto.toString().trim().length === 0 ) {
    //     data.error.tiporeferenciacontacto   = true;
    //     data.message.tiporeferenciacontacto = "Campo requerido.";
    //     bandera = false;
    // }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( referenciaContacto ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ReferenciaContactoService.onDelete(referenciaContacto).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageReferenciaContacto() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Referencia Contacto", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ReferenciaContactoActions = {
    initData,
    getAllReferenciaContacto,
    onPageReferenciaContacto,
    onLimpiar,
    setDescripcion,
    setTipoReferenciaContacto,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
