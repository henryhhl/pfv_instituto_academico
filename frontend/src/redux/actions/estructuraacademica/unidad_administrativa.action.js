
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { UnidadAdministrativaService } from "../../services/estructuraacademica/unidad_administrativa.service";

const setInit = () => ( {
    type: Constants.unidadadministrativa_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.unidadadministrativa_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.unidadadministrativa_onChange,
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
    type: Constants.unidadadministrativa_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.unidadadministrativa_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageUnidadAdministrativa = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.getAllUnidadAdministrativa( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listUnidadAdministrativa',
                        value: result.arrayUnidadAdministrativa,
                    },
                    pagination: {
                        name: 'paginationUnidadAdministrativa',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageUnidadAdministrativa',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateUnidadAdministrativa',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllUnidadAdministrativa = () => {
    return ( dispatch ) => {
        UnidadAdministrativaService.getAllUnidadAdministrativa().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadAdministrativa',
                    value: result.arrayUnidadAdministrativa,
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

const setSigla = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.sigla = value;
        unidadAdministrativa.error.sigla = false;
        unidadAdministrativa.message.sigla = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setDescripcion = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.descripcion = value;
        unidadAdministrativa.error.descripcion = false;
        unidadAdministrativa.message.descripcion = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setFKIDUnidadNegocio = (unidadAdministrativa, unidadNegocio) => {
    return ( dispatch ) => {
        unidadAdministrativa.fkidunidadnegocio = unidadNegocio.idunidadnegocio;
        unidadAdministrativa.unidadnegocio = unidadNegocio.descripcion;
        unidadAdministrativa.error.fkidunidadnegocio = false;
        unidadAdministrativa.message.fkidunidadnegocio = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setEstado = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.estado = value;
        unidadAdministrativa.error.estado = false;
        unidadAdministrativa.message.estado = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const setISDelete = (unidadAdministrativa, value) => {
    return ( dispatch ) => {
        unidadAdministrativa.isdelete = value;
        unidadAdministrativa.error.isdelete = false;
        unidadAdministrativa.message.isdelete = "";
        dispatch( onChange(unidadAdministrativa) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idunidadadministrativa ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.onShow( idunidadadministrativa ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAdministrativa ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadadministrativa ) => {
    return ( dispatch ) => {
        UnidadAdministrativaService.onEdit( idunidadadministrativa ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAdministrativa ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( unidadAdministrativa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAdministrativa ) ) {
            dispatch( onChange( unidadAdministrativa ) );
            return;
        }
        let onStore = () => {
            UnidadAdministrativaService.onStore(unidadAdministrativa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Unidad Administrativa", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( unidadAdministrativa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadAdministrativa ) ) {
            dispatch( onChange( unidadAdministrativa ) );
            return;
        }
        let onUpdate = () => {
            UnidadAdministrativaService.onUpdate(unidadAdministrativa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Unidad Administrativa", onOk: onUpdate,
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
    if ( data.fkidunidadnegocio.toString().trim().length === 0 ) {
        data.error.fkidunidadnegocio   = true;
        data.message.fkidunidadnegocio = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( unidadAdministrativa ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            UnidadAdministrativaService.onDelete(unidadAdministrativa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageUnidadAdministrativa() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Unidad Administrativa", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UnidadAdministrativaActions = {
    initData,
    onPageUnidadAdministrativa,
    getAllUnidadAdministrativa,
    onLimpiar,
    setSigla,
    setDescripcion,
    setFKIDUnidadNegocio,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
