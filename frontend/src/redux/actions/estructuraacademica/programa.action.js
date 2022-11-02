
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { ProgramaService } from "../../services/estructuraacademica/programa.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setInit = () => ( {
    type: Constants.programa_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.programa_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.programa_onChange,
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
    type: Constants.programa_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.programa_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPagePrograma = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ProgramaService.getAllPrograma( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listPrograma',
                        value: result.arrayPrograma,
                    },
                    pagination: {
                        name: 'paginationPrograma',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pagePrograma',
                        value: page,
                    },
                    paginate: {
                        name: 'paginatePrograma',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            }
        } ).finally( () => {} );
    };
};

const getAllPrograma = () => {
    return ( dispatch ) => {
        ProgramaService.getAllPrograma().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listPrograma',
                    value: result.arrayPrograma,
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

const setCodigo = (programa, value) => {
    return ( dispatch ) => {
        programa.codigo = value;
        programa.error.codigo = false;
        programa.message.codigo = "";
        dispatch( onChange(programa) );
    };
};

const setSigla = (programa, value) => {
    return ( dispatch ) => {
        programa.sigla = value;
        programa.error.sigla = false;
        programa.message.sigla = "";
        dispatch( onChange(programa) );
    };
};

const setDescripcion = (programa, value) => {
    return ( dispatch ) => {
        programa.descripcion = value;
        programa.error.descripcion = false;
        programa.message.descripcion = "";
        dispatch( onChange(programa) );
    };
};

const setFKIDUnidadAcademica = (programa, unidadAcademica) => {
    return ( dispatch ) => {
        programa.fkidunidadacademica = unidadAcademica.idunidadacademica;
        programa.unidadacademica = unidadAcademica.descripcion;

        programa.fkidunidadadministrativa = unidadAcademica.fkidunidadadministrativa;
        programa.unidadadministrativa = unidadAcademica.unidadadministrativa;

        programa.fkidunidadnegocio = unidadAcademica.fkidunidadnegocio;
        programa.unidadnegocio = unidadAcademica.unidadnegocio;

        programa.error.fkidunidadacademica = false;
        programa.message.fkidunidadacademica = "";

        programa.error.fkidunidadadministrativa = false;
        programa.message.fkidunidadadministrativa = "";

        programa.error.fkidunidadnegocio = false;
        programa.message.fkidunidadnegocio = "";
        dispatch( onChange(programa) );
    };
};

const setFKIDNivelAcademico = (programa, nivelAcademico) => {
    return ( dispatch ) => {
        programa.fkidnivelacademico = nivelAcademico.idnivelacademico;
        programa.nivelacademico = nivelAcademico.descripcion;

        programa.error.fkidnivelacademico = false;
        programa.message.fkidnivelacademico = "";
        dispatch( onChange(programa) );
    };
};

const setFKIDModalidadAcademica = (programa, modalidadAcademica) => {
    return ( dispatch ) => {
        programa.fkidmodalidadacademica = modalidadAcademica.idmodalidadacademica;
        programa.modalidadacademica = modalidadAcademica.descripcion;

        programa.error.fkidmodalidadacademica = false;
        programa.message.fkidmodalidadacademica = "";
        dispatch( onChange(programa) );
    };
};

const setEstado = (programa, value) => {
    return ( dispatch ) => {
        programa.estado = value;
        programa.error.estado = false;
        programa.message.estado = "";
        dispatch( onChange(programa) );
    };
};

const setISDelete = (programa, value) => {
    return ( dispatch ) => {
        programa.isdelete = value;
        programa.error.isdelete = false;
        programa.message.isdelete = "";
        dispatch( onChange(programa) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idprograma ) => {
    return ( dispatch ) => {
        ProgramaService.onShow( idprograma ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.programa ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idprograma ) => {
    return ( dispatch ) => {
        ProgramaService.onEdit( idprograma ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.programa ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( programa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( programa ) ) {
            dispatch( onChange( programa ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ProgramaService.onStore(programa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Programa", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( programa, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( programa ) ) {
            dispatch( onChange( programa ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ProgramaService.onUpdate(programa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Programa", onOk: onUpdate,
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
    if ( data.fkidunidadacademica.toString().trim().length === 0 ) {
        data.error.fkidunidadacademica   = true;
        data.message.fkidunidadacademica = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidnivelacademico.toString().trim().length === 0 ) {
        data.error.fkidnivelacademico   = true;
        data.message.fkidnivelacademico = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidmodalidadacademica.toString().trim().length === 0 ) {
        data.error.fkidmodalidadacademica   = true;
        data.message.fkidmodalidadacademica = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

const onDelete = ( programa ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ProgramaService.onDelete(programa).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPagePrograma() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Programa", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ProgramaActions = {
    initData,
    onPagePrograma,
    getAllPrograma,
    onLimpiar,
    setCodigo,
    setSigla,
    setDescripcion,
    setFKIDUnidadAcademica,
    setFKIDNivelAcademico,
    setFKIDModalidadAcademica,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
