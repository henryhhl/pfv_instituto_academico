
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { AsesorResponsableService } from '../../services/oportunidad/asesorresponsable.service';

const setInit = () => ( {
    type: Constants.asesorresponsable_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.asesorresponsable_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.asesorresponsable_onChange,
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
    type: Constants.asesorresponsable_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.asesorresponsable_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageAsesorResponsable = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        AsesorResponsableService.getAllAsesorResponsable( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listAsesorResponsable',
                        value: result.arrayAsesorResponsable,
                    },
                    pagination: {
                        name: 'paginationAsesorResponsable',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageAsesorResponsable',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateAsesorResponsable',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                setTimeout(() => {
                    dispatch( setHiddenSesion() );
                }, 1000);
            }
        } ).finally( () => {} );
    };
};

const getAllAsesorResponsable = () => {
    return ( dispatch ) => {
        AsesorResponsableService.getAllAsesorResponsable(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listAsesorResponsable',
                    value: result.arrayAsesorResponsable,
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

const setNombrePrincipal = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.nombreprincipal = value;
        asesorResponsable.error.nombreprincipal = false;
        asesorResponsable.message.nombreprincipal = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setNombreAdicional = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.nombreadicional = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setApellidoPrimero = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.apellidoprimero = value;
        asesorResponsable.error.apellidoprimero = false;
        asesorResponsable.message.apellidoprimero = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setApellidoSegundo = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.apellidosegundo = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setFechaNacimiento = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.fechanacimiento = value;
        asesorResponsable.error.fechanacimiento = false;
        asesorResponsable.message.fechanacimiento = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setFKIDTipoIdentificacion = (asesorResponsable, tipoIdentificacion) => {
    return ( dispatch ) => {
        asesorResponsable.fkidtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
        asesorResponsable.tipoidentificacion = tipoIdentificacion.descripcion;

        asesorResponsable.error.fkidtipoidentificacion = false;
        asesorResponsable.message.fkidtipoidentificacion = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setNumeroIdentificacion = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.numeroidentificacion = value;
        asesorResponsable.error.numeroidentificacion = false;
        asesorResponsable.message.numeroidentificacion = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setComision = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.comision = value;
        asesorResponsable.error.comision = false;
        asesorResponsable.message.comision = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setValorPorcentaje = (asesorResponsable, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( (parseFloat( value ) >= 0 && parseFloat( value ) <= 100) || value === "" ) {
                asesorResponsable.valorporcentaje = (value === "") ? value : parseFloat(value);
                asesorResponsable.error.valorporcentaje = false;
                asesorResponsable.message.valorporcentaje = "";
                dispatch( onChange(asesorResponsable) );
            }
        }
    };
};

const setGenero = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.genero = value;
        asesorResponsable.error.genero = false;
        asesorResponsable.message.genero = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setEstadoCivil = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.estadocivil = value;
        asesorResponsable.error.estadocivil = false;
        asesorResponsable.message.estadocivil = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const getCiudadNacimiento = ( array = [] ) => {
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

const setFKIDCiudadNacimiento = (asesorResponsable, ciudad) => {
    return ( dispatch ) => {
        asesorResponsable.fkidciudadnacimiento = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        asesorResponsable.ciudadnacimiento = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        asesorResponsable.error.fkidciudadnacimiento = false;
        asesorResponsable.message.fkidciudadnacimiento = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setFKIDCiudadResidencia = (asesorResponsable, ciudad) => {
    return ( dispatch ) => {
        asesorResponsable.fkidciudadresidencia = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        asesorResponsable.ciudadresidencia = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        asesorResponsable.error.fkidciudadresidencia = false;
        asesorResponsable.message.fkidciudadresidencia = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setDireccion = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.direccion = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setBarrio = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.barrio = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setManzano = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.manzano = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setUV = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.uv = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setTelefono = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.telefono = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setCelular = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.celular = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setEmail = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.email = value;
        asesorResponsable.error.email = false;
        asesorResponsable.message.email = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setImagen = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.imagen = value;
        dispatch( onChange(asesorResponsable) );
    };
};

const setEstado = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.estado = value;
        asesorResponsable.error.estado = false;
        asesorResponsable.message.estado = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const setISDelete = (asesorResponsable, value) => {
    return ( dispatch ) => {
        asesorResponsable.isdelete = value;
        asesorResponsable.error.isdelete = false;
        asesorResponsable.message.isdelete = "";
        dispatch( onChange(asesorResponsable) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idasesorresponsable ) => {
    return ( dispatch ) => {
        AsesorResponsableService.onShow( 
            idasesorresponsable 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.asesorResponsable ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idasesorresponsable ) => {
    return ( dispatch ) => {
        AsesorResponsableService.onEdit( 
            idasesorresponsable 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.asesorResponsable ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( asesorResponsable, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( asesorResponsable ) ) {
            dispatch( onChange( asesorResponsable ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            AsesorResponsableService.onStore(
                asesorResponsable
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
            title: "Registrar Asesor Responsable", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( asesorResponsable, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( asesorResponsable ) ) {
            dispatch( onChange( asesorResponsable ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            AsesorResponsableService.onUpdate(
                asesorResponsable
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
            title: "Editar Asesor Responsable", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.nombreprincipal.toString().trim().length === 0 ) {
        data.error.nombreprincipal   = true;
        data.message.nombreprincipal = "Campo requerido.";
        bandera = false;
    }
    if ( data.apellidoprimero.toString().trim().length === 0 ) {
        data.error.apellidoprimero   = true;
        data.message.apellidoprimero = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechanacimiento.toString().trim().length === 0 ) {
        data.error.fechanacimiento   = true;
        data.message.fechanacimiento = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidtipoidentificacion.toString().trim().length === 0 ) {
        data.error.fkidtipoidentificacion   = true;
        data.message.fkidtipoidentificacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.numeroidentificacion.toString().trim().length === 0 ) {
        data.error.numeroidentificacion   = true;
        data.message.numeroidentificacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.genero.toString().trim().length === 0 ) {
        data.error.genero   = true;
        data.message.genero = "Campo requerido.";
        bandera = false;
    }
    if ( data.estadocivil.toString().trim().length === 0 ) {
        data.error.estadocivil   = true;
        data.message.estadocivil = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidciudadnacimiento.toString().trim().length === 0 ) {
        data.error.fkidciudadnacimiento   = true;
        data.message.fkidciudadnacimiento = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidciudadresidencia.toString().trim().length === 0 ) {
        data.error.fkidciudadresidencia   = true;
        data.message.fkidciudadresidencia = "Campo requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length > 0 ) {
        if ( !Functions.validateEmail( data.email ) ) {
            data.error.email   = true;
            data.message.email = "Email requerido.";
            bandera = false;
        }
    }
    if ( data.comision.toString().trim().length === 0 ) {
        data.error.comision   = true;
        data.message.comision = "Campo requerido.";
        bandera = false;
    }
    if ( data.valorporcentaje.toString().trim().length === 0 ) {
        data.error.valorporcentaje   = true;
        data.message.valorporcentaje = "Campo requerido.";
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

const onDelete = ( asesorResponsable ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            AsesorResponsableService.onDelete(
                asesorResponsable
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageAsesorResponsable() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Asesor Responsable", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const AsesorResponsableActions = {
    initData, 
    onPageAsesorResponsable, getAllAsesorResponsable,
    onLimpiar, onChange,
    setNombrePrincipal,
    setNombreAdicional,
    setApellidoPrimero,
    setApellidoSegundo,
    setFechaNacimiento,
    setFKIDTipoIdentificacion,
    setNumeroIdentificacion,
    setComision,
    setValorPorcentaje,
    setGenero,
    setEstadoCivil,
    setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia,
    setDireccion,
    setBarrio,
    setManzano,
    setUV,
    setTelefono,
    setCelular,
    setEmail,
    setImagen,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
