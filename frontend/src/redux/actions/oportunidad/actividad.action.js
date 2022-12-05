
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from '../../../utils/functions';
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { ActividadService } from '../../services/oportunidad/actividad.service';

const setInit = () => ( {
    type: Constants.actividad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.actividad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.actividad_onChange,
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
    type: Constants.actividad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.actividad_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageActividad = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        ActividadService.getAllActividad( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listActividad',
                        value: result.arrayActividad,
                    },
                    pagination: {
                        name: 'paginationActividad',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageActividad',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateActividad',
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

const getAllActividad = () => {
    return ( dispatch ) => {
        ActividadService.getAllActividad(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listActividad',
                    value: result.arrayActividad,
                };
                dispatch( onListModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setFKIDTipoActividad = (actividad, tipoActividad) => {
    return ( dispatch ) => {
        actividad.fkidtipoactividad = tipoActividad.idtipoactividad;
        actividad.tipoactividad = tipoActividad.descripcion;
        actividad.error.fkidtipoactividad = false;
        actividad.message.fkidtipoactividad = "";
        dispatch( onChange(actividad) );
    };
};

const setFKIDAsesorResponsable = (actividad, asesorResponsable) => {
    return ( dispatch ) => {
        actividad.fkidasesorresponsable = asesorResponsable.idasesorresponsable;
        actividad.asesorresponsable = `${asesorResponsable.nombreprincipal} ${asesorResponsable.nombreadicional} ${asesorResponsable.apellidoprimero} ${asesorResponsable.apellidosegundo}`;
        actividad.error.fkidasesorresponsable = false;
        actividad.message.fkidasesorresponsable = "";
        dispatch( onChange(actividad) );
    };
};

const setFKIDEstadoNegocio = (actividad, estadoNegocio) => {
    return ( dispatch ) => {
        actividad.fkidestadonegocio = estadoNegocio.idestadonegocio;
        actividad.estadonegocio = estadoNegocio.descripcion;
        actividad.error.fkidestadonegocio = false;
        actividad.message.fkidestadonegocio = "";
        dispatch( onChange(actividad) );
    };
};

const setFKIDNegocio = (actividad, negocio) => {
    return ( dispatch ) => {
        actividad.fkidnegocio = negocio.idnegocio;
        actividad.negocio = negocio.oportunidad;
        actividad.error.fkidnegocio = false;
        actividad.message.fkidnegocio = "";
        dispatch( onChange(actividad) );
    };
};

const setFechaProgramada = (actividad, value) => {
    return ( dispatch ) => {
        actividad.fechaprogramada = value;
        actividad.error.fechaprogramada = false;
        actividad.message.fechaprogramada = "";
        dispatch( onChange(actividad) );
    };
};

const setHoraProgramada = (actividad, value) => {
    return ( dispatch ) => {
        actividad.horaprogramada = value;
        actividad.error.horaprogramada = false;
        actividad.message.horaprogramada = "";
        dispatch( onChange(actividad) );
    };
};

const setFechaCierre = (actividad, value) => {
    return ( dispatch ) => {
        if ( Functions.compareFinishDateString(actividad.fechaprogramada, value) ) {
            actividad.fechacierre = value;
            actividad.error.fechacierre = false;
            actividad.message.fechacierre = "";
            dispatch( onChange(actividad) );
        }
    };
};

const setNota = (actividad, value) => {
    return ( dispatch ) => {
        actividad.nota = value;
        dispatch( onChange(actividad) );
    };
};

const setResultado = (actividad, value) => {
    return ( dispatch ) => {
        actividad.resultado = value;
        dispatch( onChange(actividad) );
    };
};


const setEstado = (actividad, value) => {
    return ( dispatch ) => {
        actividad.estado = value;
        actividad.error.estado = false;
        actividad.message.estado = "";
        dispatch( onChange(actividad) );
    };
};

const setISDelete = (actividad, value) => {
    return ( dispatch ) => {
        actividad.isdelete = value;
        actividad.error.isdelete = false;
        actividad.message.isdelete = "";
        dispatch( onChange(actividad) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idactividad ) => {
    return ( dispatch ) => {
        ActividadService.onShow( 
            idactividad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.actividad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idactividad ) => {
    return ( dispatch ) => {
        ActividadService.onEdit( 
            idactividad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.actividad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( actividad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( actividad ) ) {
            dispatch( onChange( actividad ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            ActividadService.onStore(
                actividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    actividad.error.descripcion   = true;
                    actividad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(actividad) );
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

const onUpdate = ( actividad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( actividad ) ) {
            dispatch( onChange( actividad ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            ActividadService.onUpdate(
                actividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    actividad.error.descripcion   = true;
                    actividad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(actividad) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Actividad", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidtipoactividad.toString().trim().length === 0 ) {
        data.error.fkidtipoactividad   = true;
        data.message.fkidtipoactividad = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidasesorresponsable.toString().trim().length === 0 ) {
        data.error.fkidasesorresponsable   = true;
        data.message.fkidasesorresponsable = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidestadonegocio.toString().trim().length === 0 ) {
        data.error.fkidestadonegocio   = true;
        data.message.fkidestadonegocio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidnegocio.toString().trim().length === 0 ) {
        data.error.fkidnegocio   = true;
        data.message.fkidnegocio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechaprogramada.toString().trim().length === 0 ) {
        data.error.fechaprogramada   = true;
        data.message.fechaprogramada = "Campo requerido.";
        bandera = false;
    }
    if ( data.horaprogramada.toString().trim().length === 0 ) {
        data.error.horaprogramada   = true;
        data.message.horaprogramada = "Campo requerido.";
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

const onDelete = ( actividad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            ActividadService.onDelete(
                actividad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageActividad() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Actividad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const ActividadActions = {
    initData,
    onPageActividad,
    getAllActividad,
    onLimpiar,
    setFKIDTipoActividad,
    setFKIDAsesorResponsable,
    setFKIDEstadoNegocio,
    setFKIDNegocio,
    setFechaProgramada,
    setHoraProgramada,
    setFechaCierre,
    setNota,
    setResultado,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
