
import ConfirmationComponent from "../../components/confirmation";
import Constants from "../constants/constans";
import { NivelAcademicoService } from "../services/nivelAcademico.service";

const setInit = () => ( {
    type: Constants.nivelAcademico_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.nivelAcademico_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.nivelAcademico_onChange,
    payload: data,
} );

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.nivelAcademico_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.nivelAcademico_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllNivelAcademico = () => {
    return ( dispatch ) => {
        NivelAcademicoService.getAllNivelAcademico().then( (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listNivelAcademico',
                    value: result.arrayNivelAcademico,
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

const setSigla = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.sigla = value;
        nivelAcademico.error.sigla = false;
        nivelAcademico.message.sigla = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setDescripcion = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.descripcion = value;
        nivelAcademico.error.descripcion = false;
        nivelAcademico.message.descripcion = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setEstado = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.estado = value;
        nivelAcademico.error.estado = false;
        nivelAcademico.message.estado = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setISDelete = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.isdelete = value;
        nivelAcademico.error.isdelete = false;
        nivelAcademico.message.isdelete = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idnivelacademico ) => {
    return ( dispatch ) => {
        NivelAcademicoService.onShow( idnivelacademico ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.nivelAcademico ) );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idnivelacademico ) => {
    return ( dispatch ) => {
        NivelAcademicoService.onEdit( idnivelacademico ).then( (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.nivelAcademico ) );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( nivelacademico, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( nivelacademico ) ) {
            dispatch( onChange( nivelacademico ) );
            return;
        }
        let onStore = () => {
            NivelAcademicoService.onStore(nivelacademico).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Registrar Nivel Academico", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( nivelacademico, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( nivelacademico ) ) {
            dispatch( onChange( nivelacademico ) );
            return;
        }
        let onUpdate = () => {
            NivelAcademicoService.onUpdate(nivelacademico).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Editar Nivel Academico", onOk: onUpdate,
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

const onDelete = ( nivelAcademico ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            NivelAcademicoService.onDelete(nivelAcademico).then( (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllNivelAcademico() );
                }
            } ).finally( () => {} );
        };
        ConfirmationComponent( {
            title: "Eliminar Nivel Academico", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const NivelAcademicoActions = {
    initData,
    getAllNivelAcademico,
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
