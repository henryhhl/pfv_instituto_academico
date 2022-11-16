
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { EstudianteService } from "../../services/persona/estudiante.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.estudiante_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.estudiante_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.estudiante_onChange,
    payload: data,
} );

const onAddRowNacionalidad = ( ) => ( {
    type: Constants.estudiante_onAddRowNacionalidad,
} );

const onDeleteRowNacionalidad = ( index ) => ( {
    type: Constants.estudiante_onDeleteRowNacionalidad,
    payload: index,
} );

const onAddRowCategoriaDocumento = ( ) => ( {
    type: Constants.estudiante_onAddRowCategoriaDocumento,
} );

const onDeleteRowCategoriaDocumento = ( index ) => ( {
    type: Constants.estudiante_onDeleteRowCategoriaDocumento,
    payload: index,
} );

const onAddRowFamiliar = ( ) => ( {
    type: Constants.estudiante_onAddRowFamiliar,
} );

const onDeleteRowFamiliar = ( index ) => ( {
    type: Constants.estudiante_onDeleteRowFamiliar,
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
    type: Constants.estudiante_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.estudiante_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageEstudiante = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        EstudianteService.getAllEstudiante( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listEstudiante',
                        value: result.arrayEstudiante,
                    },
                    pagination: {
                        name: 'paginationEstudiante',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageEstudiante',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateEstudiante',
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

const getAllEstudiante = () => {
    return async ( dispatch ) => {
        await EstudianteService.getAllEstudiante(
            
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listEstudiante',
                    value: result.arrayEstudiante,
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

const setNombrePrincipal = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.nombreprincipal = value;
        estudiante.error.nombreprincipal = false;
        estudiante.message.nombreprincipal = "";
        dispatch( onChange(estudiante) );
    };
};

const setNombreAdicional = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.nombreadicional = value;
        dispatch( onChange(estudiante) );
    };
};

const setApellidoPrimero = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.apellidoprimero = value;
        estudiante.error.apellidoprimero = false;
        estudiante.message.apellidoprimero = "";
        dispatch( onChange(estudiante) );
    };
};

const setApellidoSegundo = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.apellidosegundo = value;
        dispatch( onChange(estudiante) );
    };
};

const setFechaNacimiento = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.fechanacimiento = value;
        estudiante.error.fechanacimiento = false;
        estudiante.message.fechanacimiento = "";
        dispatch( onChange(estudiante) );
    };
};

const setFKIDTipoIdentificacion = (estudiante, tipoIdentificacion) => {
    return ( dispatch ) => {
        estudiante.fkidtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
        estudiante.tipoidentificacion = tipoIdentificacion.descripcion;

        estudiante.error.fkidtipoidentificacion = false;
        estudiante.message.fkidtipoidentificacion = "";
        dispatch( onChange(estudiante) );
    };
};

const setNumeroIdentificacion = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.numeroidentificacion = value;
        estudiante.error.numeroidentificacion = false;
        estudiante.message.numeroidentificacion = "";
        dispatch( onChange(estudiante) );
    };
};

const setGenero = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.genero = value;
        estudiante.error.genero = false;
        estudiante.message.genero = "";
        dispatch( onChange(estudiante) );
    };
};

const setEstadoCivil = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.estadocivil = value;
        estudiante.error.estadocivil = false;
        estudiante.message.estadocivil = "";
        dispatch( onChange(estudiante) );
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

const setFKIDCiudadNacimiento = (estudiante, ciudad) => {
    return ( dispatch ) => {
        estudiante.fkidciudadnacimiento = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        estudiante.ciudadnacimiento = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        estudiante.error.fkidciudadnacimiento = false;
        estudiante.message.fkidciudadnacimiento = "";
        dispatch( onChange(estudiante) );
    };
};

const setFKIDCiudadResidencia = (estudiante, ciudad) => {
    return ( dispatch ) => {
        estudiante.fkidciudadresidencia = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        estudiante.ciudadresidencia = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        estudiante.error.fkidciudadresidencia = false;
        estudiante.message.fkidciudadresidencia = "";
        dispatch( onChange(estudiante) );
    };
};

const setDireccion = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.direccion = value;
        dispatch( onChange(estudiante) );
    };
};

const setBarrio = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.barrio = value;
        dispatch( onChange(estudiante) );
    };
};

const setManzano = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.manzano = value;
        dispatch( onChange(estudiante) );
    };
};

const setUV = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.uv = value;
        dispatch( onChange(estudiante) );
    };
};

const setTelefono = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.telefono = value;
        dispatch( onChange(estudiante) );
    };
};

const setCelular = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.celular = value;
        dispatch( onChange(estudiante) );
    };
};

const setEmail = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.email = value;
        estudiante.error.email = false;
        estudiante.message.email = "";
        dispatch( onChange(estudiante) );
    };
};

const setImagen = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.imagen = value;
        dispatch( onChange(estudiante) );
    };
};

const setEstado = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.estado = value;
        estudiante.error.estado = false;
        estudiante.message.estado = "";
        dispatch( onChange(estudiante) );
    };
};

const setISDelete = (estudiante, value) => {
    return ( dispatch ) => {
        estudiante.isdelete = value;
        estudiante.error.isdelete = false;
        estudiante.message.isdelete = "";
        dispatch( onChange(estudiante) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idestudiante ) => {
    return ( dispatch ) => {
        EstudianteService.onShow( 
            idestudiante 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.estudiante ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idestudiante ) => {
    return ( dispatch ) => {
        EstudianteService.onEdit( 
            idestudiante 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.estudiante ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( estudiante, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( estudiante ) ) {
            dispatch( onChange( estudiante ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            EstudianteService.onStore(
                estudiante
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
            title: "Registrar Estudiante", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( estudiante, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( estudiante ) ) {
            dispatch( onChange( estudiante ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            EstudianteService.onUpdate(
                estudiante
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
            title: "Editar Estudiante", onOk: onUpdate,
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
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    for (let index = 0; index < data.arrayfamiliar.length; index++) {
        const element = data.arrayfamiliar[index];
        if ( element.nombreprincipal.toString().trim().length === 0 ) {
            element.error.nombreprincipal   = true;
            element.message.nombreprincipal = "Campo requerido.";
            bandera = false;
        }
        if ( element.apellidoprimero.toString().trim().length === 0 ) {
            element.error.apellidoprimero   = true;
            element.message.apellidoprimero = "Campo requerido.";
            bandera = false;
        }
        if ( element.fkidtipoidentificacion === null || element.fkidtipoidentificacion.toString().trim().length === 0 ) {
            element.error.fkidtipoidentificacion   = true;
            element.message.fkidtipoidentificacion = "Campo requerido.";
            bandera = false;
        }
        if ( element.numeroidentificacion.toString().trim().length === 0 ) {
            element.error.numeroidentificacion   = true;
            element.message.numeroidentificacion = "Campo requerido.";
            bandera = false;
        }
        if ( element.genero.toString().trim().length === 0 ) {
            element.error.genero   = true;
            element.message.genero = "Campo requerido.";
            bandera = false;
        }
        if ( element.estadocivil.toString().trim().length === 0 ) {
            element.error.estadocivil   = true;
            element.message.estadocivil = "Campo requerido.";
            bandera = false;
        }
        if ( element.fkidciudadnacimiento === null || element.fkidciudadnacimiento.toString().trim().length === 0 ) {
            element.error.fkidciudadnacimiento   = true;
            element.message.fkidciudadnacimiento = "Campo requerido.";
            bandera = false;
        }
        if ( element.fkidciudadresidencia === null || element.fkidciudadresidencia.toString().trim().length === 0 ) {
            element.error.fkidciudadresidencia   = true;
            element.message.fkidciudadresidencia = "Campo requerido.";
            bandera = false;
        }
        if ( element.fechanacimiento.toString().trim().length === 0 ) {
            element.error.fechanacimiento   = true;
            element.message.fechanacimiento = "Campo requerido.";
            bandera = false;
        }
        if ( element.tiporelacion.toString().trim().length === 0 ) {
            element.error.tiporelacion   = true;
            element.message.tiporelacion = "Campo requerido.";
            bandera = false;
        }
        if ( element.email.toString().trim().length > 0 ) {
            if ( !Functions.validateEmail( element.email ) ) {
                element.error.email   = true;
                element.message.email = "Email requerido.";
                bandera = false;
            }
        }
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

const onDelete = ( estudiante ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            EstudianteService.onDelete(
                estudiante
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageEstudiante() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Estudiante", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const EstudianteActions = {
    initData, onPageEstudiante, getAllEstudiante,
    onLimpiar, onChange,
    onAddRowNacionalidad, onDeleteRowNacionalidad,
    onAddRowCategoriaDocumento, onDeleteRowCategoriaDocumento,
    onAddRowFamiliar, onDeleteRowFamiliar,
    setNombrePrincipal,
    setNombreAdicional,
    setApellidoPrimero,
    setApellidoSegundo,
    setFechaNacimiento,
    setFKIDTipoIdentificacion,
    setNumeroIdentificacion,
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
