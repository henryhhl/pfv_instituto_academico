
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { PensumService } from "../../services/estructuraacademica/pensum.service";

const setInit = () => ( {
    type: Constants.pensum_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.pensum_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.pensum_onChange,
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
    type: Constants.pensum_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.pensum_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPagePensum = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        PensumService.getAllPensum( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listPensum',
                        value: result.arrayPensum,
                    },
                    pagination: {
                        name: 'paginationPensum',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pagePensum',
                        value: page,
                    },
                    paginate: {
                        name: 'paginatePensum',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllPensum = () => {
    return ( dispatch ) => {
        PensumService.getAllPensum().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listPensum',
                    value: result.arrayPensum,
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

const setDescripcion = (pensum, value) => {
    return ( dispatch ) => {
        pensum.descripcion = value;
        pensum.error.descripcion = false;
        pensum.message.descripcion = "";
        dispatch( onChange(pensum) );
    };
};

const setFechaAprobacion = (pensum, value) => {
    return ( dispatch ) => {
        pensum.fechaaprobacion = value;
        pensum.error.fechaaprobacion = false;
        pensum.message.fechaaprobacion = "";
        dispatch( onChange(pensum) );
    };
};

const setNota = (pensum, value) => {
    return ( dispatch ) => {
        pensum.nota = value;
        dispatch( onChange(pensum) );
    };
};

const setFKIDPrograma = (pensum, programa) => {
    return ( dispatch ) => {
        pensum.fkidprograma = programa.idprograma;
        pensum.programa = programa.descripcion;

        pensum.fkidunidadacademica = programa.fkidunidadacademica;
        pensum.unidadacademica = programa.unidadacademica;

        pensum.fkidunidadadministrativa = programa.fkidunidadadministrativa;
        pensum.unidadadministrativa = programa.unidadadministrativa;

        pensum.fkidunidadnegocio = programa.fkidunidadnegocio;
        pensum.unidadnegocio = programa.unidadnegocio;

        pensum.error.fkidprograma = false;
        pensum.message.fkidprograma = "";

        pensum.error.fkidunidadacademica = false;
        pensum.message.fkidunidadacademica = "";

        pensum.error.fkidunidadadministrativa = false;
        pensum.message.fkidunidadadministrativa = "";

        pensum.error.fkidunidadnegocio = false;
        pensum.message.fkidunidadnegocio = "";
        dispatch( onChange(pensum) );
    };
};

const setEstado = (pensum, value) => {
    return ( dispatch ) => {
        pensum.estado = value;
        pensum.error.estado = false;
        pensum.message.estado = "";
        dispatch( onChange(pensum) );
    };
};

const setISDelete = (pensum, value) => {
    return ( dispatch ) => {
        pensum.isdelete = value;
        pensum.error.isdelete = false;
        pensum.message.isdelete = "";
        dispatch( onChange(pensum) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idpensum ) => {
    return ( dispatch ) => {
        PensumService.onShow( idpensum ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.pensum ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idpensum ) => {
    return ( dispatch ) => {
        PensumService.onEdit( idpensum ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.pensum ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( pensum, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( pensum ) ) {
            dispatch( onChange( pensum ) );
            return;
        }
        let onStore = () => {
            PensumService.onStore(pensum).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Pensum", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( pensum, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( pensum ) ) {
            dispatch( onChange( pensum ) );
            return;
        }
        let onUpdate = () => {
            PensumService.onUpdate(pensum).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Pensum", onOk: onUpdate,
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
    if ( data.fechaaprobacion.toString().trim().length === 0 ) {
        data.error.fechaaprobacion   = true;
        data.message.fechaaprobacion = "Campo requerido.";
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
    if ( data.fkidunidadacademica.toString().trim().length === 0 ) {
        data.error.fkidunidadacademica   = true;
        data.message.fkidunidadacademica = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidprograma.toString().trim().length === 0 ) {
        data.error.fkidprograma   = true;
        data.message.fkidprograma = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( pensum ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            PensumService.onDelete(pensum).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPagePensum() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Pensum", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const PensumActions = {
    initData,
    onPagePensum,
    getAllPensum,
    onLimpiar,
    setFechaAprobacion,
    setDescripcion,
    setNota,
    setFKIDPrograma,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
