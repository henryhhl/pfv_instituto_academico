
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from '../../../utils/functions';
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';

const setInit = () => ( {
    type: Constants.oportunidad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.oportunidad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.oportunidad_onChange,
    payload: data,
} );

const onAddRowTipoContacto = ( ) => ( {
    type: Constants.oportundiad_onAddRowTipoContacto,
} );

const onDeleteRowTipoContacto = ( index ) => ( {
    type: Constants.oportundiad_onDeleteRowTipoContacto,
    payload: index,
} );

const onAddRowTipoMedioPublicitario = ( ) => ( {
    type: Constants.oportundiad_onAddRowTipoMedioPublicitario,
} );

const onDeleteRowTipoMedioPublicitario = ( index ) => ( {
    type: Constants.oportundiad_onDeleteRowTipoMedioPublicitario,
    payload: index,
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
    type: Constants.oportunidad_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.oportunidad_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageOportunidad = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        OportunidadService.getAllOportunidad( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listOportunidad',
                        value: result.arrayOportunidad,
                    },
                    pagination: {
                        name: 'paginationOportunidad',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageOportunidad',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateOportunidad',
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

const getAllOportunidad = () => {
    return ( dispatch ) => {
        OportunidadService.getAllOportunidad(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listOportunidad',
                    value: result.arrayOportunidad,
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

const getCiudadOrigen = ( array = [] ) => {
    let ciudades = "";
    for (let index = array.length; index > 0; index--) {
        const element = array[index - 1];
        if ( index === 1 ) { 
            ciudades += `${element}`;
        } else {
            ciudades += `${element}, `;
        }
    }
    return ciudades;
}

const setFKIDCiudadOrigen = (oportunidad, ciudad) => {
    return ( dispatch ) => {
        oportunidad.fkidciudadorigen = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        oportunidad.ciudadorigen = `${getCiudadOrigen(ciudad.arrayFamily)}`;
        oportunidad.error.fkidciudadorigen = false;
        oportunidad.message.fkidciudadorigen = "";
        dispatch( onChange(oportunidad) );
    };
};

const setFKIDAsesorResponsable = (oportunidad, asesorResponsable) => {
    return ( dispatch ) => {
        oportunidad.fkidasesorresponsable = asesorResponsable.idasesorresponsable;
        oportunidad.asesorresponsable = `${asesorResponsable.nombreprincipal} ${asesorResponsable.nombreadicional} ${asesorResponsable.apellidoprimero} ${asesorResponsable.apellidosegundo}`;
        oportunidad.error.fkidasesorresponsable = false;
        oportunidad.message.fkidasesorresponsable = "";
        dispatch( onChange(oportunidad) );
    };
};

const setIdentificacion = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.identificacion = value;
        oportunidad.error.identificacion = false;
        oportunidad.message.identificacion = "";
        dispatch( onChange(oportunidad) );
    };
};

const setDescripcion = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.descripcion = value;
        oportunidad.error.descripcion = false;
        oportunidad.message.descripcion = "";
        dispatch( onChange(oportunidad) );
    };
};

const setCelular = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.celular = value;
        oportunidad.error.celular = false;
        oportunidad.message.celular = "";
        dispatch( onChange(oportunidad) );
    };
};

const setEmail = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.email = value;
        oportunidad.error.email = false;
        oportunidad.message.email = "";
        dispatch( onChange(oportunidad) );
    };
};

const setDireccion = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.direccion = value;
        oportunidad.error.direccion = false;
        oportunidad.message.direccion = "";
        dispatch( onChange(oportunidad) );
    };
};

const setBarrio = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.barrio = value;
        oportunidad.error.barrio = false;
        oportunidad.message.barrio = "";
        dispatch( onChange(oportunidad) );
    };
};

const setFechaRegistro = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.fecharegistro = value;
        oportunidad.error.fecharegistro = false;
        oportunidad.message.fecharegistro = "";
        dispatch( onChange(oportunidad) );
    };
};

const setHoraRegistro = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.horaregistro = value;
        oportunidad.error.horaregistro = false;
        oportunidad.message.horaregistro = "";
        dispatch( onChange(oportunidad) );
    };
};

const setNota = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.nota = value;
        dispatch( onChange(oportunidad) );
    };
};

const setEstado = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.estado = value;
        oportunidad.error.estado = false;
        oportunidad.message.estado = "";
        dispatch( onChange(oportunidad) );
    };
};

const setISDelete = (oportunidad, value) => {
    return ( dispatch ) => {
        oportunidad.isdelete = value;
        oportunidad.error.isdelete = false;
        oportunidad.message.isdelete = "";
        dispatch( onChange(oportunidad) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idoportunidad ) => {
    return ( dispatch ) => {
        OportunidadService.onShow( 
            idoportunidad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.oportunidad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idoportunidad ) => {
    return ( dispatch ) => {
        OportunidadService.onEdit( 
            idoportunidad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.oportunidad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( oportunidad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( oportunidad ) ) {
            dispatch( onChange( oportunidad ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            OportunidadService.onStore(
                oportunidad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    oportunidad.error.descripcion   = true;
                    oportunidad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(oportunidad) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Oportunidad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( oportunidad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( oportunidad ) ) {
            dispatch( onChange( oportunidad ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            OportunidadService.onUpdate(
                oportunidad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    oportunidad.error.descripcion   = true;
                    oportunidad.message.descripcion = "Tipo ya existente.";
                    dispatch( onChange(oportunidad) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Oportunidad", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidciudadorigen.toString().trim().length === 0 ) {
        data.error.fkidciudadorigen   = true;
        data.message.fkidciudadorigen = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidasesorresponsable.toString().trim().length === 0 ) {
        data.error.fkidasesorresponsable   = true;
        data.message.fkidasesorresponsable = "Campo requerido.";
        bandera = false;
    }
    if ( data.identificacion.toString().trim().length === 0 ) {
        data.error.identificacion   = true;
        data.message.identificacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    if ( data.celular.toString().trim().length === 0 ) {
        data.error.celular   = true;
        data.message.celular = "Campo requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length === 0 ) {
        data.error.email   = true;
        data.message.email = "Campo requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length > 0 ) {
        if ( !Functions.validateEmail( data.email ) ) {
            data.error.email   = true;
            data.message.email = "Email requerido.";
            bandera = false;
        }
    }
    if ( data.direccion.toString().trim().length === 0 ) {
        data.error.direccion   = true;
        data.message.direccion = "Campo requerido.";
        bandera = false;
    }
    if ( data.barrio.toString().trim().length === 0 ) {
        data.error.barrio   = true;
        data.message.barrio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fecharegistro.toString().trim().length === 0 ) {
        data.error.fecharegistro   = true;
        data.message.fecharegistro = "Campo requerido.";
        bandera = false;
    }
    if ( data.horaregistro.toString().trim().length === 0 ) {
        data.error.horaregistro   = true;
        data.message.horaregistro = "Campo requerido.";
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

const onDelete = ( oportunidad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            OportunidadService.onDelete(
                oportunidad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageOportunidad() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Oportunidad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const OportunidadActions = {
    initData,
    onPageOportunidad,
    getAllOportunidad,
    onLimpiar,
    onChange,
    onAddRowTipoContacto,
    onDeleteRowTipoContacto,
    onAddRowTipoMedioPublicitario,
    onDeleteRowTipoMedioPublicitario,
    setFKIDCiudadOrigen,
    setFKIDAsesorResponsable,
    setIdentificacion,
    setDescripcion,
    setCelular,
    setEmail,
    setDireccion,
    setBarrio,
    setFechaRegistro,
    setHoraRegistro,
    setNota,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
