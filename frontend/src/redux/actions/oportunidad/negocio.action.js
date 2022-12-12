
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { NegocioService } from '../../services/oportunidad/negocio.service';
import { Functions } from '../../../utils/functions';

const setInit = () => ( {
    type: Constants.negocio_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.negocio_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.negocio_onChange,
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
    type: Constants.negocio_onCreate,
} );

const setCreateNegocio = (data) => ( {
    type: Constants.negocio_onCreateNegocio,
    payload: data,
} );

const setShowData = ( data ) => ( {
    type: Constants.negocio_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageNegocio = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        NegocioService.getAllNegocio( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listNegocio',
                        value: result.arrayNegocio,
                    },
                    pagination: {
                        name: 'paginationNegocio',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageNegocio',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateNegocio',
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

const getAllNegocio = () => {
    return ( dispatch ) => {
        NegocioService.getAllNegocio(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listNegocio',
                    value: result.arrayNegocio,
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

const setFKIDPrograma = (negocio, programa) => {
    return ( dispatch ) => {
        negocio.fkidprograma = programa.idprograma;
        negocio.programa = programa.descripcion;
        negocio.error.fkidprograma = false;
        negocio.message.fkidprograma = "";
        dispatch( onChange(negocio) );
    };
};

const setFKIDTurno = (negocio, turno) => {
    return ( dispatch ) => {
        negocio.fkidturno = turno.idturno;
        negocio.turno = turno.descripcion;
        negocio.error.fkidturno = false;
        negocio.message.fkidturno = "";
        dispatch( onChange(negocio) );
    };
};

const setFKIDEstadoNegocio = (negocio, estadoNegocio) => {
    return ( dispatch ) => {
        negocio.fkidestadonegocio = estadoNegocio.idestadonegocio;
        negocio.estadonegocio = estadoNegocio.descripcion;
        negocio.error.fkidestadonegocio = false;
        negocio.message.fkidestadonegocio = "";
        dispatch( onChange(negocio) );
    };
};

const setFKIDOportunidad = (negocio, oportunidad) => {
    return ( dispatch ) => {
        negocio.fkidoportunidad = oportunidad.idoportunidad;
        negocio.oportunidad = oportunidad.descripcion;
        negocio.error.fkidoportunidad = false;
        negocio.message.fkidoportunidad = "";
        dispatch( onChange(negocio) );
    };
};

const setFechaInicio = (negocio, value) => {
    return ( dispatch ) => {
        if ( Functions.compareInitDateString(value, negocio.fechacierre) ) {
            if ( value === "" ) {
                negocio.fechacierre = "";
            }
            negocio.fechainicio = value;
            negocio.error.fechainicio = false;
            negocio.message.fechainicio = "";
            dispatch( onChange(negocio) );
        }
    };
};

const setFechaCierre = (negocio, value) => {
    return ( dispatch ) => {
        if ( Functions.compareFinishDateString(negocio.fechainicio, value) ) {
            negocio.fechacierre = value;
            negocio.error.fechacierre = false;
            negocio.message.fechacierre = "";
            dispatch( onChange(negocio) );
        }
    };
};

const setNota = (negocio, value) => {
    return ( dispatch ) => {
        negocio.nota = value;
        dispatch( onChange(negocio) );
    };
};

const setEstado = (negocio, value) => {
    return ( dispatch ) => {
        negocio.estado = value;
        negocio.error.estado = false;
        negocio.message.estado = "";
        dispatch( onChange(negocio) );
    };
};

const setISDelete = (negocio, value) => {
    return ( dispatch ) => {
        negocio.isdelete = value;
        negocio.error.isdelete = false;
        negocio.message.isdelete = "";
        dispatch( onChange(negocio) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onCreateNegocio = ( fkidoportunidad ) => {
    return ( dispatch ) => {
        dispatch( setShowLoading() );
        NegocioService.onCreate( 
            fkidoportunidad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setCreateNegocio( result ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const onShow = ( idnegocio ) => {
    return ( dispatch ) => {
        NegocioService.onShow( 
            idnegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.negocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idnegocio ) => {
    return ( dispatch ) => {
        NegocioService.onEdit( 
            idnegocio 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.negocio ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( negocio, onFunction ) => {
    return ( dispatch ) => {
        if ( !onValidate( negocio ) ) {
            dispatch( onChange( negocio ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            NegocioService.onStore(
                negocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onFunction(result);
                } else if ( result.resp === 0 ) {
                    negocio.error.descripcion   = true;
                    negocio.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(negocio) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Negocio", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( negocio, onFunction ) => {
    return ( dispatch ) => {
        if ( !onValidate( negocio ) ) {
            dispatch( onChange( negocio ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            NegocioService.onUpdate(
                negocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onFunction(result);
                } else if ( result.resp === 0 ) {
                    negocio.error.descripcion   = true;
                    negocio.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(negocio) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Negocio", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidprograma.toString().trim().length === 0 ) {
        data.error.fkidprograma   = true;
        data.message.fkidprograma = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidturno.toString().trim().length === 0 ) {
        data.error.fkidturno   = true;
        data.message.fkidturno = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidestadonegocio.toString().trim().length === 0 ) {
        data.error.fkidestadonegocio   = true;
        data.message.fkidestadonegocio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidoportunidad.toString().trim().length === 0 ) {
        data.error.fkidoportunidad   = true;
        data.message.fkidoportunidad = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechainicio.toString().trim().length === 0 ) {
        data.error.fechainicio   = true;
        data.message.fechainicio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechacierre.toString().trim().length === 0 ) {
        data.error.fechacierre   = true;
        data.message.fechacierre = "Campo requerido.";
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

const onDelete = ( negocio, onFunction = () => {}, ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            NegocioService.onDelete(
                negocio
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    // dispatch( onPageNegocio() );
                    onFunction(result);
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Negocio", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const NegocioActions = {
    initData,
    onPageNegocio,
    getAllNegocio,
    onLimpiar,
    setFKIDPrograma,
    setFKIDTurno,
    setFKIDEstadoNegocio,
    setFKIDOportunidad,
    setFechaInicio,
    setFechaCierre,
    setNota,
    setEstado,
    setISDelete,
    onCreate,
    onCreateNegocio,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
