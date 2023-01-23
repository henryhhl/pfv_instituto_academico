
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { ParametroCalificacionService } from '../../services/nota/parametrocalificacion.service';
import { Functions } from '../../../utils/functions';
import { CalendarioAcademicoService } from '../../services/nota/calendarioacademico.service';

const setInit = () => ( {
    type: Constants.calendarioacademico_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.calendarioacademico_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.calendarioacademico_onChange,
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
    type: Constants.calendarioacademico_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.calendarioacademico_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPage = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.getAll( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listParametroCalificacion',
                        value: result.arrayParametroCalificacion,
                    },
                    pagination: {
                        name: 'paginationParametroCalificacion',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageParametroCalificacion',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateParametroCalificacion',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const getAll = (calendarioAcademico) => {
    return ( dispatch ) => {
        if ( !onValidateCalendar( calendarioAcademico ) ) {
            dispatch( onChange( calendarioAcademico ) );
            return;
        }
        dispatch( setShowLoading() );
        CalendarioAcademicoService.getAll( {
            fkidunidadadministrativa: calendarioAcademico.fkidunidadadministrativa, 
            fkidgestionperiodo: calendarioAcademico.fkidgestionperiodo,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                calendarioAcademico.showcalendar = true;
                calendarioAcademico.arrayCalendarioAcademico = result.arrayCalendarioAcademico;
                dispatch( onChange( calendarioAcademico ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch(setHiddenLoading());
        } );
    };
};

const onValidateCalendar = (data) => {
    let bandera = true;
    if ( !Functions.existsData(data.fkidunidadadministrativa) ) {
        data.error.fkidunidadadministrativa   = true;
        data.message.fkidunidadadministrativa = "Campo requerido.";
        bandera = false;
    }
    if ( !Functions.existsData(data.fkidgestionperiodo) ) {
        data.error.fkidgestionperiodo   = true;
        data.message.fkidgestionperiodo = "Campo requerido.";
        bandera = false;
    }
    if ( !bandera ) {
        Swal.fire( {
            position: 'top-end',
            icon: 'warning',
            title: "No se pudo realizar la Funcionalidad",
            text: "Favor llenar los campos requeridos.",
            showConfirmButton: false,
            timer: 3000,
        } );
    }
    return bandera;
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setFKIDUnidadAdministrativa = (calendarioAcademico, unidadAdministrativa) => {
    return ( dispatch ) => {
        calendarioAcademico.fkidunidadadministrativa = unidadAdministrativa.idunidadadministrativa;
        calendarioAcademico.unidadadministrativa = `${unidadAdministrativa.descripcion}, ${unidadAdministrativa.unidadnegocio}`;
        calendarioAcademico.error.fkidunidadadministrativa = false;
        calendarioAcademico.message.fkidunidadadministrativa = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setFKIDGestionPeriodo = (calendarioAcademico, gestionPeriodo) => {
    return ( dispatch ) => {
        if ( calendarioAcademico.fkidgestionperiodo !== gestionPeriodo.idgestionperiodo ) {
            calendarioAcademico.arrayCalendarioAcademico = [];
        }
        calendarioAcademico.fkidgestionperiodo = gestionPeriodo.idgestionperiodo;
        calendarioAcademico.gestionperiodo = gestionPeriodo.descripcion;

        calendarioAcademico.fechainicio = gestionPeriodo.fechainicio;
        calendarioAcademico.fechafinal = gestionPeriodo.fechafinal;

        calendarioAcademico.showcalendar = false;
        calendarioAcademico.error.fkidgestionperiodo = false;
        calendarioAcademico.message.fkidgestionperiodo = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setFechaNota = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.fechanota = value;
        calendarioAcademico.nota = "";
        calendarioAcademico.tipoactividad = "Ninguno";
        calendarioAcademico.tipoferiado = "Ninguno";
        calendarioAcademico.existeclases = "No";

        calendarioAcademico.error.fechanota = false;
        calendarioAcademico.message.fechanota = "";

        calendarioAcademico.error.nota = false;
        calendarioAcademico.message.nota = "";

        calendarioAcademico.error.tipoactividad = false;
        calendarioAcademico.message.tipoactividad = "";

        calendarioAcademico.error.tipoferiado = false;
        calendarioAcademico.message.tipoferiado = "";

        calendarioAcademico.error.existeclases = false;
        calendarioAcademico.message.existeclases = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setNota = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.nota = value;
        calendarioAcademico.error.nota = false;
        calendarioAcademico.message.nota = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setTipoActividad = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.tipoactividad = value;
        calendarioAcademico.error.tipoactividad = false;
        calendarioAcademico.message.tipoactividad = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setTipoFeriado = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.tipoferiado = value;
        calendarioAcademico.error.tipoferiado = false;
        calendarioAcademico.message.tipoferiado = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setExisteClases = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.existeclases = value;
        calendarioAcademico.error.existeclases = false;
        calendarioAcademico.message.existeclases = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setEstado = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.estado = value;
        calendarioAcademico.error.estado = false;
        calendarioAcademico.message.estado = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const setISDelete = (calendarioAcademico, value) => {
    return ( dispatch ) => {
        calendarioAcademico.isdelete = value;
        calendarioAcademico.error.isdelete = false;
        calendarioAcademico.message.isdelete = "";
        dispatch( onChange(calendarioAcademico) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idparametrocalificacion ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.onShow( 
            idparametrocalificacion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.calendarioAcademico ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idparametrocalificacion ) => {
    return ( dispatch ) => {
        ParametroCalificacionService.onEdit( 
            idparametrocalificacion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.calendarioAcademico ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( calendarioAcademico, onFunction ) => {
    return ( dispatch ) => {
        if ( !onValidate( calendarioAcademico ) ) {
            dispatch( onChange( calendarioAcademico ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CalendarioAcademicoService.onStore(
                calendarioAcademico
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAll(calendarioAcademico) );
                    onFunction();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Actividad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( calendarioAcademico, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( calendarioAcademico ) ) {
            dispatch( onChange( calendarioAcademico ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ParametroCalificacionService.onUpdate(
                calendarioAcademico
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Parametro Calificación", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

const onValidate = ( data ) => {
    let bandera = true;
    if ( data.fkidunidadadministrativa.toString().trim().length === 0 ) {
        data.error.fkidunidadadministrativa   = true;
        data.message.fkidunidadadministrativa = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidgestionperiodo.toString().trim().length === 0 ) {
        data.error.fkidgestionperiodo   = true;
        data.message.fkidgestionperiodo = "Campo requerido.";
        bandera = false;
    }
    if ( data.tipoactividad.toString().trim().length === 0 ) {
        data.error.tipoactividad   = true;
        data.message.tipoactividad = "Campo requerido.";
        bandera = false;
    }
    if ( data.tipoferiado.toString().trim().length === 0 ) {
        data.error.tipoferiado   = true;
        data.message.tipoferiado = "Campo requerido.";
        bandera = false;
    }
    if ( data.existeclases.toString().trim().length === 0 ) {
        data.error.existeclases   = true;
        data.message.existeclases = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechanota.toString().trim().length === 0 ) {
        data.error.fechanota   = true;
        data.message.fechanota = "Campo requerido.";
        bandera = false;
    }
    if ( data.nota.toString().trim().length === 0 ) {
        data.error.nota   = true;
        data.message.nota = "Campo requerido.";
        bandera = false;
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    if ( !bandera ) {
        Swal.fire( {
            position: 'top-end',
            icon: 'warning',
            title: "No se pudo realizar la Funcionalidad",
            text: "Favor llenar los campos requeridos.",
            showConfirmButton: false,
            timer: 3000,
        } );
    }
    return bandera;
};

const onDelete = ( calendarioAcademico, idcalendarioacademico ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            CalendarioAcademicoService.onDelete(
                idcalendarioacademico
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAll(calendarioAcademico) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Actividad del Calendario", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const CalendarioAcademicoActions = {
    initData,
    onPage,
    getAll,
    onLimpiar,
    setFKIDUnidadAdministrativa,
    setFKIDGestionPeriodo,
    setFechaNota,
    setNota,
    setTipoActividad,
    setTipoFeriado,
    setExisteClases,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
