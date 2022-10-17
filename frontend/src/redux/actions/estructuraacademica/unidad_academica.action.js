
import ConfirmationComponent from "../../../components/confirmation";
import Constants from "../../constants/constans";
import { UnidadAcademicaService } from "../../services/estructuraacademica/unidad_academica.service";

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

const getAllUnidadAcademica = () => {
    return ( dispatch ) => {
        UnidadAcademicaService.getAllUnidadAcademica().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUnidadAcademica',
                    value: result.arrayUnidadAcademica,
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
        UnidadAcademicaService.onShow( idunidadacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAcademica ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idunidadacademica ) => {
    return ( dispatch ) => {
        UnidadAcademicaService.onEdit( idunidadacademica ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.unidadAcademica ) );
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
            UnidadAcademicaService.onStore(unidadAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
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
            UnidadAcademicaService.onUpdate(unidadAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
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
    return bandera;
};

const onDelete = ( unidadAcademica ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            UnidadAcademicaService.onDelete(unidadAcademica).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllUnidadAcademica() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Unidad Academica", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UnidadAcademicaActions = {
    initData,
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
